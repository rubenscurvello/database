import {
  ConfigDatabaseInterface,
  Connector,
  DatabasePackage,
  Repository,
} from "types";

import Informix from "database-informix";
class Database {
  private config: ConfigDatabaseInterface;
  private connector: Connector;
  private drivers = {
    informix: Informix,
  };
  private repository: Repository;
  constructor(config: ConfigDatabaseInterface) {
    this.config = config;
  }
  connect(): void {
    try {
      // ATTEMPT TO CONNECT
      const connector = this.getDriver().Connector as any;
      this.connector = new connector(this.config);
      this.connector.connect();
    } catch (e) {}
  }
  getConnector(): Connector {
    if (!this.connector) {
      this.connect();
    }
    return this.connector;
  }
  getDriver(): DatabasePackage {
    return this.drivers[this.config["driver"].toLowerCase()];
  }
  getRepository(): Repository {
    if (!this.repository) {
      const repository = this.getDriver().Repository as any;
      this.repository = new repository(this.getConnector());
    }
    return this.repository;
  }
  disconnect() {
    // this.connector.close();
  }
}

export default Database;
