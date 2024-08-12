import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const TypeOrmConfig: TypeOrmModuleOptions = {
	type: "postgres",
	host: "",
	port: 5432,
	username: "",
	password: "",
	database: "",
	entities: [__dirname + "/../**/*.entity.{js,ts}"],
	synchronize: true,
}