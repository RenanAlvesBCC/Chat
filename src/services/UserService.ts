import {getCustomRepository, Repository} from "typeorm";
import {UsersRepository} from "../repositories/usersRepository";
import {User} from "../entities/user";

class UserService {

    private usersRepository : Repository<User>

    constructor() {
        this.usersRepository = getCustomRepository(UsersRepository);
    }

    async create(email: string) {

        if(!email) {
            throw new Error('Email inválido');
        }

        const userAlreadyExist = await this.usersRepository.findOne({email})

        if(userAlreadyExist) {
            return userAlreadyExist;
        }

        const user = await this.usersRepository.create({email});

        await this.usersRepository.save(user);

        return user;

    }

    async findByEmail(email: string) {

        return await this.usersRepository.findOne({
            email
        })

    }

}

export { UserService };
