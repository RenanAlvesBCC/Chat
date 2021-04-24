import { Repository, EntityRepository } from "typeorm";
import { User } from "../entities/user";

@EntityRepository(User)
class UsersRepository extends Repository<User> {}

export { UsersRepository };
