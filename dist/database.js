"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_informix_1 = __importDefault(require("database-informix"));
class Database {
    constructor(config) {
        this.drivers = {
            informix: database_informix_1.default,
        };
        this.config = config;
    }
    connect() {
        try {
            // ATTEMPT TO CONNECT
            const connector = this.getDriver().Connector;
            this.connector = new connector(this.config);
            this.connector.connect();
        }
        catch (e) { }
    }
    getConnector() {
        if (!this.connector) {
            this.connect();
        }
        return this.connector;
    }
    getDriver() {
        return this.drivers[this.config["driver"].toLowerCase()];
    }
    getRepository() {
        if (!this.repository) {
            const repository = this.getDriver().Repository;
            this.repository = new repository(this.getConnector());
        }
        return this.repository;
    }
    disconnect() {
        // this.connector.close();
    }
}
exports.default = Database;
