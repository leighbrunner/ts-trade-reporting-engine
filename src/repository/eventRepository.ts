import {TradeEvent} from "../entity/tradeEvent";
import {AppDataSource} from "../db";

export class EventRepository {

    async saveEvent(tradeEvent: TradeEvent): Promise<TradeEvent> {
        return AppDataSource.manager.save(tradeEvent);
    }

    async findAllEvents(): Promise<TradeEvent[]> {
        return AppDataSource.manager.find(TradeEvent);
    }

    async findBySellerPartyAndPremiumCurrency(sellerParty: string, premiumCurrency: string): Promise<TradeEvent[]> {
        return AppDataSource.manager.find(TradeEvent, {
            where: {
                seller_party: sellerParty,
                premium_currency: premiumCurrency
            }
        });
    }

    async findEventsByCurrency(currency: string) {
        return AppDataSource.manager.find(TradeEvent, {
            where: {
                premium_currency: currency.toUpperCase()
            }
        });
    }
}