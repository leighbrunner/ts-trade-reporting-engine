import { DataSource } from "typeorm"
import { TradeEvent } from './entity/tradeEvent';

export const AppDataSource: DataSource = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    entities: [TradeEvent],
    synchronize: true,
    logging: false,
});