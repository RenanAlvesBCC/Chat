import {Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import { v4 as uuid } from "uuid";
import {User} from "./user";

@Entity("messages")
class Message {

    @PrimaryColumn()
    id: string;

    @Column()
    admin_id: string;

    @Column()
    text: string;

    @CreateDateColumn()
    created_at: Date

    @Column()
    user_id: string;

    @JoinColumn({ name: "user_id" })
    @ManyToOne(() => User)
    user: User

    constructor() {

        if(!this.id) {
            this.id = uuid();
        }

    }

}

export { Message }
