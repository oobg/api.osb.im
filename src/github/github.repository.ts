import { Repository } from "typeorm";
import { Github } from "./github.entity";
import { CustomRepository } from "../configs/typeorm/custom.decorator";

@CustomRepository(Github)
export class GithubRepository extends Repository<Github> {
}