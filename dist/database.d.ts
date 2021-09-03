import { ConfigDatabaseInterface, Connector, DatabasePackage, Repository } from "types";
declare class Database {
    private config;
    private connector;
    private drivers;
    private repository;
    constructor(config: ConfigDatabaseInterface);
    connect(): void;
    getConnector(): Connector;
    getDriver(): DatabasePackage;
    getRepository(): Repository;
    disconnect(): void;
}
export default Database;
