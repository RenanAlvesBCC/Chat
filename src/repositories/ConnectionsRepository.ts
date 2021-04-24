import {Repository, EntityRepository} from "typeorm";
import {Connection} from "../entities/connections";

@EntityRepository(Connection)
class ConnectionsRepository extends Repository<Connection> {}

export {ConnectionsRepository}
