import { io } from '../http';

import { ConnectionsService } from "../services/ConnectionsService";
import { UserService } from "../services/UserService";
import {MessagesService} from "../services/MessagesService";

interface IParams {
    text: string,
    email: string
}

io.on('connect', socket => {

    const connectionServices = new ConnectionsService();
    const usersService = new UserService();
    const messagesService = new MessagesService();

    socket.on('client_first_access', async params => {

        const { text, email } = params as IParams;

        const socket_id = socket.id;

        let user_id = null;

        const userExist = await usersService.findByEmail(email);

        if(!userExist) {
            const user = await usersService.create(email);

            await connectionServices.create({
                socket_id,
                user_id: user.id
            })

            user_id = user.id;
        } else {

            user_id = userExist.id;

            const connection = await connectionServices.findByUserId(userExist.id);

            if(!connection) {
                await connectionServices.create({
                    socket_id,
                    user_id: userExist.id
                })
            } else {
                connection.socket_id = socket_id;

                await connectionServices.create(connection);
            }
        }

        await messagesService.create({
            text,
            user_id
        })

        const allMessages = await messagesService.listByUser(user_id);

        socket.emit('client_list_all_messages',allMessages);

        const allUsers = await connectionServices.findAllWithoutAdmin();

        io.emit('admin_list_all_users', allUsers);
    })


    socket.on('client_send_to_admin', async (params) => {
        const { text, socket_admin_id} = params;

        const socket_id = socket.id;

        const { user_id } = await connectionServices.findBySocketID(socket.id);

        const message = await messagesService.create({
            text,
            user_id
        })

        io.to(socket_admin_id).emit('admin_receive_message', {
            message,
            socket_id
        })

    })
})
