import {Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, UpdateDateColumn} from "typeorm";
import { v4 as uuid } from "uuid";
import {User} from "./user";

@Entity('connections')
class Connection {
    @PrimaryColumn()
    id: string;

    @Column()
    admin_id: string;

    @Column()
    socket_id: string;

    @CreateDateColumn()
    created_at: Date

    @Column()
    user_id: string;

    @JoinColumn({ name: "user_id" })
    @ManyToOne(() => User)
    user: User

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {

        if(!this.id) {
            this.id = uuid();
        }

    }
}

export { Connection }
