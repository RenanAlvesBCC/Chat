import {MessagesRepository} from "../repositories/MessagesRepository";
import {getCustomRepository} from "typeorm";


interface IMessageCreate {

    admin_id?: string,
    text: string,
    user_id: string

}

class MessagesService {

    private repository: MessagesRepository;

    constructor() {
        this.repository = getCustomRepository(MessagesRepository);
    }

    async create({admin_id, text, user_id}: IMessageCreate) {

        const message = this.repository.create({
            admin_id,
            text,
            user_id
        })

        await this.repository.save(message);

        return message;

    }

    async listByUser(user_id: string) {

        return await this.repository.find({
            where: {user_id},
            relations: ["user"]
        })

    }





}

export { MessagesService }
