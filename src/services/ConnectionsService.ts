import {getCustomRepository, Repository} from 'typeorm'
import {ConnectionsRepository} from "../repositories/ConnectionsRepository";
import {Connection} from "../entities/connections";

interface IConnectionCreate {
    socket_id: string,
    user_id: string,
    admin_id?: string,
    id?: string,
}

class ConnectionsService {

    private connectionRepository: Repository<Connection>;

    constructor() {
        this.connectionRepository = getCustomRepository(ConnectionsRepository)
    }

    async create({socket_id, user_id, admin_id, id }: IConnectionCreate) {

        const connection = this.connectionRepository.create({
            socket_id,
            user_id,
            admin_id,
            id
        });

        await this.connectionRepository.save(connection);

        return connection;
    }


    async findByUserId(user_id: string) {

        return await this.connectionRepository.findOne({
            user_id
        });

    }

    async findAllWithoutAdmin() {
        return await this.connectionRepository.find({
            where: {admin_id: null},
            relations: ["user"],
        })
    }

    async findBySocketID(socket_id: string) {

        return await this.connectionRepository.findOne({
            socket_id
        })

    }

    async updateAdminID(user_id: string, admin_id: string) {


        await this.connectionRepository
        .createQueryBuilder()
        .update(Connection)
        .set({admin_id})
        .where("user_id = :user_id", {
            user_id
        })
        .execute();
    }

}

export { ConnectionsService }
