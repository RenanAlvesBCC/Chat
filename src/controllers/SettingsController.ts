import {Request, Response} from "express";
import {SettingsService} from "../services/ServiceSettings";


class SettingsController {

    async create(request: Request, response: Response) {

        const settingsService = new SettingsService();

        try {
            const settings = await settingsService.create(request.body);

            return response.send(settings);
        }catch (e){
            return response.status(400).json({
                message: e.message
            })
        }

    }

    async findByUsername(request: Request, response: Response) {

        const { username } = request.params;

        const settingsService = new SettingsService();

        const settings = await settingsService.findByUsername(username);

        return response.json(settings)
    }

    async update(request: Request, response: Response) {

        const { username } = request.params;

        const { chat } = request.body;

        const settingsService = new SettingsService();

        const settings = await settingsService.update(username, chat);

        return response.json(settings)
    }

}

export { SettingsController }