import { Injectable, Logger } from '@nestjs/common';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MONGODB_PORT, MONGODB_NAME } from '@mataf-poc/shared';

@Injectable()
export class InMemoryMongoService {
  private readonly logger = new Logger(InMemoryMongoService.name);
  private mongod:MongoMemoryServer;

  constructor() {
  }

  public async spinServer() {
    this.mongod = new MongoMemoryServer({
      autoStart: true,
      instance: {
        port: MONGODB_PORT,
        dbName: MONGODB_NAME,
      },
    });

    const uri = await this.mongod.getUri();
    const port = await this.mongod.getPort();
    const dbPath = await this.mongod.getDbPath();
    const dbName = await this.mongod.getDbName();

    this.logger.debug(`Mongo instance name ${MONGODB_NAME} is lietening on port ${MONGODB_PORT}`);
    this.logger.debug(`\t-> uri=${uri}`);
    this.logger.debug(`\t-> port=${port}`);
    this.logger.debug(`\t-> dbPath=${dbPath}`);
    this.logger.debug(`\t-> name=${dbName}`);
  }
}
