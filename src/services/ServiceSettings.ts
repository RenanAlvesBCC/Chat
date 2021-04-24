import {getCustomRepository} from "typeorm";
import {SettingsRepository} from "../repositories/SettingsRepository";
import {Setting} from "../entities/settings";

interface ISettingsCreate {
    chat: boolean,
    username: string
}

class SettingsService {

    private settingsRepository: SettingsRepository;

    constructor() {
        this.settingsRepository = getCustomRepository(SettingsRepository);
    }

    async create({chat, username}: ISettingsCreate) {

        const userAlreadyExist = await this.settingsRepository.findOne({username})

        if(userAlreadyExist) {
            throw new Error('User already exist');
        }

        const settings = await this.settingsRepository.create({
            chat,
            username
        })

        await this.settingsRepository.save(settings);

        return settings;

    }

    async findByUsername(username: string) {

        return await this.settingsRepository.findOne({
            username
        })

    }

    async update(username: string, chat: boolean) {

        const settings = await this.settingsRepository.createQueryBuilder()
            .update(Setting)
            .set({chat})
            .where("username = :username", {username})
            .execute();

    }

}

export { SettingsService }
