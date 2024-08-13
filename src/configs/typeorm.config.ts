import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import "dotenv/config";

function TypeOrmConfig(): TypeOrmModuleOptions {
	const commonConfig = {
		ENTITIES: [__dirname + "/../**/*.entity.{js,ts}"],
		MIGRATIONS: [__dirname + "/../**/*.migration.{js,ts}"],
		MIGRATION_RUN: false,
		LOGGING: false,
		SYNCRONIZE: process.env.DB_SYNCHRONIZE.toLowerCase() === "true" ? true : false,
	};

	const database = {
		type: process.env.DB_TYPE as "mysql" | "mariadb" | "postgres" | "cockroachdb" | "sqlite" | "mssql" | "sap" | "oracle",
		host: process.env.DB_HOST,
		port: parseInt(process.env.DB_PORT, 10),
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		synchronize: process.env.DB_SYNCHRONIZE,
	};

	const typeOrmConfig: TypeOrmModuleOptions = {
		type: database.type,
		host: database.host,
		port: database.port,
		username: database.username,
		password: database.password,
		database: database.database,

		entities: commonConfig.ENTITIES,
		synchronize: commonConfig.SYNCRONIZE,
		logging: commonConfig.LOGGING,
		migrations: commonConfig.MIGRATIONS,
		migrationsRun: commonConfig.MIGRATION_RUN,
	};

	return typeOrmConfig;
}

export { TypeOrmConfig };