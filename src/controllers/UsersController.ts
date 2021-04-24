import {UserService} from "../services/UserService";
import {User} from "../entities/user";


class UsersController {

    async create(request, response): Promise<Response> {
        const { email } = request.body;

        try {
            const usersService = new UserService();

            const user = await usersService.create(email);

            return response.json(user);
        } catch (e) {
            response.status(400).json({
                message: e.message
            })
        }

    }

}

export { UsersController }
