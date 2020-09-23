# Steps

1. Build the solution using the original selection of technologies/architecture guidelines:
    a. Nest.js
    b. MongoDB (via Mongoose)
    c. Microservices exposing REST endpoints
    d. Swagger
    e. Angular (FE)
2. Fork the project, then introduce GraphQL into the architecture, replacing subcomponents
    as needed in locations we believe will be most beneficial.
3. Compare both approaches/solutions and draw conclusions

# Business Flow

The clerk checks a client’s eligibility for a loan via the Snifit system:

1. Enters client’s ID
2. Checks if the client exists and has at least one account ​ _(accounts service)_
    _[http://localhost:8001/api/#/partners/PartnersController_getPartnerAccounts](http://localhost:8001/api/#/partners/PartnersController_getPartnerAccounts)_
       _OR_
    _[http://localhost:8001/api/#/partners/PartnersController_find](http://localhost:8001/api/#/partners/PartnersController_find)_
3. Gets a table of client’s accounts and loans (existing and historical) - ​ _(loans service)_
    **_accounts_**
    _[http://localhost:8001/api/#/partners/PartnersController_getPartnerAccounts](http://localhost:8001/api/#/partners/PartnersController_getPartnerAccounts)_
    **_loans by accounts_**
    _[http://localhost:8001/api/#/loans/LoansController_find](http://localhost:8001/api/#/loans/LoansController_find)_
       _OR_
    _[http://localhost:8001/api/#/loans/LoansController_findByAccounts](http://localhost:8001/api/#/loans/LoansController_findByAccounts)_
4. Selects an account - clicks the NEW LOAN button in the account row, modal opens
5. Show list of available loans (products) by user score
    [http://localhost:8001/api/#/loan-products/LoanProductsController_findAll](http://localhost:8001/api/#/loan-products/LoanProductsController_findAll)


6. Fills the new loan form:
    a. Amount
    b. Term (months)
    c. Clicks CHECK
7. The system checks the client’s eligibility for a new loan ​ _(loans service)_
    a. Defaulted on a loan in the past? → not eligible
    b. Else calculate client’s risk and derived loan rate
       [http://localhost:8001/api/#/loans/LoansController_checkLoan](http://localhost:8001/api/#/loans/LoansController_checkLoan)
8. If client decides to take loan
    a. clerk presses TAKE LOAN
       [http://localhost:8001/api/#/loans/LoansController_takeLoan](http://localhost:8001/api/#/loans/LoansController_takeLoan)
    b. A new loan sub-account is created with balance
    c. A new user loan is created (User Loans collection) with loan definitions

## Risk Calculation

1. TL < AB && CSR < 2 → Low risk
2. TL < 2 * AB && CSR < 4 → Medium risk
3. TL >= 2 * AB || CSR >= 4 → High risk
Where:
**TL** ​ = Total Loans (outstanding amounts, including new loan application)
**AB** ​ = Aggregated Balance (across accounts)
**CSR** ​= Credit Score Rating

## Loan Rate Calculation

Depends on the risk and loan term:
Low Risk → Base rate = Product Loan Rate * 1.
Medium Risk → Base rate = Product Loan Rate * 1.
High Risk → Base rate = Product Loan Rate * 1.
Loan Term - for every month another 0.0083% is added to the rate


# Subsystems

ODS (source MongoDB)
Loans service
Accounts Service
Risk Calc Service

# Architecture


# Models

## Account

```
● Account number
● (Account) Holder name (שם החשבון)
● Type (Business / Private)
● Partners (Partner[])
  ○ ID
  ○ Role (Owner / Signee)
  ○ Name
● Branch number
● Credit (מסגרת אשראי)
● Credit Score Rating 1-8 (דירוג אשראי)
● Sub Accounts - list of
  ○ Type
■ (Savings, Checking, Loans)
■ Code (product number e.g. 105 = חשבון עו”ש שיקלי)
  ○ Balances
■ Value date
■ Currency
■ Withdrawal balance
■ Closing balance
■ Current balance
```
## User Loans Collection

```
● Account number
● Loan Amount
● Status (Frozen, In-Process, Active, Completed)
● Loan Code
● Date Taken
● Date Closed
● Has defaulted
● Monthly payment
● Last monthly payment
● Loan term
● Currency
```

## Loan Products Collection (~5 all in all)

```
● Product Name (הלוואה לחברי חבר)
● Loan code
● Sub Account Type Code (105, 106 etc.)
● Credit Score Limit (up to 8)
● Max Loan amount
● Max Loan Term (months)
● Currency
● Loan Rate
```

