import { Injectable } from '@nestjs/common';
import {
  AccountPartnerType,
  LoanStatus,
  SubAccountType,
  Currency,
  AccountType,
} from '@mataf-poc/models';
import {
  ODSAccountsService,
  MatafAccount,
  ODSLoanProductsService,
  ODSPartnerService,
  ODSSubAccountService,
  MatafAccountPartner,
  CreatePartnerDto,
  CreateSubAccountDto,
  CreateLoanDto,
  ODSLoanService,
  MatafLoan,
  PaginationDto,
  PopulatedAccountDto,
} from '@mataf-poc/ods-mongoose';
import { MatafSubAccount } from 'libs/ods-mongoose/src/lib/schemas/accounts/sub-account.schema';
import { loanProducts } from '../assets/loansProduct';
import { v4 } from 'uuid';

const names = require('../assets/names.json');
const NUMBER_OF_ACCOUNTS = 35;

const MIN_LOAN_PERIOD_IN_MONTHS = 6;
// approximation
const MONTH_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 30;

@Injectable()
export class GeneratorService {
  constructor(
    private odsAccountsService: ODSAccountsService,
    private odsPartnerService: ODSPartnerService,
    private odsSubAccountService: ODSSubAccountService,
    private odsLoanService: ODSLoanService,
    private odsLoanProductsService: ODSLoanProductsService
  ) {}

  async generate(): Promise<MatafAccount[]> {
    // clear all data
    await this.flushAll();
    let promises = [];
    for (let i = 0; i < NUMBER_OF_ACCOUNTS; i++) {
      promises.push(this.createAccount(i));
    }
    // create loan products from loanProducts.ts
    promises = promises.concat(
      loanProducts.map((lp) => this.odsLoanProductsService.create(lp))
    );

    return Promise.all(promises);
  }

  async createAccount(index: number): Promise<MatafAccount> {
    const createAccountDto = new PopulatedAccountDto();

    createAccountDto.holder = names[index];
    createAccountDto.number = (10000 + index).toString();
    createAccountDto.type =
      index % 2 ? AccountType.BUSINESS : AccountType.PERSONAL;
    createAccountDto.branchNumber = 100 + (index % 4);
    createAccountDto.creditScoreRating = 8 - (index % 3);
    createAccountDto.credit = (index % 8) * 1000 - 4000;

    // create partners
    const partner = await this.createPartner(
      createAccountDto.number,
      names[index],
      AccountPartnerType.OWNER
    );
    createAccountDto.partners = [partner];
    // create sub accounts
    const subTypes = GeneratorService.getRandomArr<string>(
      ['saving', 'checking', 'loans'],
      2
    );

    createAccountDto.subAccounts = [];
    for (let i = 0; i < subTypes.length; i++) {
      const subAccount = await this.createSubAccount(
        index,
        i,
        subTypes[i] as SubAccountType
      );
      createAccountDto.subAccounts.push(subAccount);
    }

    if (subTypes.includes('loans')) {
      this.createLoan(createAccountDto.number, index);
    }

    return this.odsAccountsService.create(createAccountDto);
  }

  async createSubAccount(
    index: number,
    subIndex: number,
    type: SubAccountType
  ): Promise<MatafSubAccount> {
    const createSubAccount = new CreateSubAccountDto();

    createSubAccount.type = type;
    createSubAccount.number = v4();
    createSubAccount.code = 100 + (index % 6);

    createSubAccount.balances = {
      closingBalance: GeneratorService.generateBalance(),
      currency: Currency.ILS,
      withdrawalBalance: GeneratorService.generateBalance(),
      currentBalance: GeneratorService.generateBalance(),
      valueDate: Date.now(),
    };

    return this.odsSubAccountService.create(createSubAccount);
  }

  async createPartner(
    accountNumber: string,
    name: string,
    role: AccountPartnerType
  ): Promise<MatafAccountPartner> {
    const createPartner = new CreatePartnerDto();

    createPartner.accountNumber = accountNumber;
    createPartner.name = name;
    createPartner.role = role;
    let id = 0;
    for (let j = 0; j < Math.min(4, name.length); j++) {
      id += name.charCodeAt(j) * Math.pow(10, j * 2);
    }
    createPartner.id = id.toString().padStart(9, '0');

    return this.odsPartnerService.create(createPartner);
  }

  async createLoan(accountNumber: string, index): Promise<MatafLoan> {
    const createLoan = new CreateLoanDto();

    createLoan.accountNumber = accountNumber;

    const loanProduct = GeneratorService.getRandomItem(loanProducts);

    createLoan.code = loanProduct.loanCode;
    createLoan.loanNumber = v4();
    createLoan.currency = loanProduct.currency;
    createLoan.amount = GeneratorService.generateBalance(
      loanProduct.maxLoanAmount
    );

    createLoan.loanTermMonths = GeneratorService.generateInteger(
      MIN_LOAN_PERIOD_IN_MONTHS,
      loanProduct.maxLoanTermMonths
    );
    createLoan.monthlyPayment = createLoan.amount / createLoan.loanTermMonths;
    createLoan.lastMonthlyPayment = createLoan.monthlyPayment;

    const loanAgeInMonths = GeneratorService.generateInteger(
      MIN_LOAN_PERIOD_IN_MONTHS,
      loanProduct.maxLoanTermMonths
    );
    // calc date take and date end
    createLoan.dateTaken = Date.now() - loanAgeInMonths * MONTH_IN_MILLISECONDS;
    createLoan.dateClosed =
      createLoan.dateTaken + createLoan.loanTermMonths * MONTH_IN_MILLISECONDS;

    createLoan.status =
      createLoan.dateClosed > Date.now()
        ? LoanStatus.COMPLETED
        : LoanStatus.ACTIVE;

    createLoan.hasDefaulted = index % 20 === 0;
    return this.odsLoanService.create(createLoan);
  }

  async findAll(paginationDto: PaginationDto) {
    return this.odsAccountsService.findAll({
      ...paginationDto,
      populate: 'partners',
    });
  }

  async findAllLoans(paginationDto: PaginationDto) {
    return this.odsLoanService.findAll({
      ...paginationDto,
    });
  }

  async flushAll() {
    return Promise.all([
      this.odsAccountsService.flush(),
      this.odsSubAccountService.flush(),
      this.odsPartnerService.flush(),
      this.odsLoanService.flush(),
      this.odsLoanProductsService.flush(),
    ]);
  }

  static getRandomArr<T>(arr: T[], n: number): T[] {
    // Shuffle array
    const shuffled = [...arr].sort(() => 0.5 - Math.random());

    // Get sub-array of first n elements after shuffled
    return shuffled.slice(0, n);
  }

  static getRandomItem<T>(arr: T[]): T {
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
  }

  static generateBalance(max: number = 50000): number {
    return parseFloat((Math.random() * max).toFixed(2));
  }

  static generateInteger(min: number = 0, max: number = 10000): number {
    return min + Math.floor(Math.random() * max);
  }
}
