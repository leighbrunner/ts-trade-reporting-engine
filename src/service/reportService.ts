import {TradeEvent} from "../entity/tradeEvent";
import {EventRepository} from "../repository/eventRepository";

const eventRepository: EventRepository = new EventRepository();

export class ReportService {

/*    async getEmuBankAUDAndBisonBankUSDNonAnagramParties(): Promise<TradeEvent[]> {

        const prom1: Promise<TradeEvent[]> = eventRepository.findBySellerPartyAndPremiumCurrency("EMU_BANK", "AUD");
        const prom2: Promise<TradeEvent[]> = eventRepository.findBySellerPartyAndPremiumCurrency("BISON_BANK", "USD");
        return Promise.all([prom1, prom2])
            .then(([events1, events2]) => {
                const combinedEvents = [...events1, ...events2];
                return combinedEvents.filter(event => isAnagrams(event.buyer_party, event.seller_party));
            })
            .catch(error => {
            // Handle errors
            console.error('Error retrieving trade events:', error);
        });
    }*/

    async getEmuBankAUDAndBisonBankUSDNonAnagramParties(): Promise<TradeEvent[]> {
        const prom1: Promise<TradeEvent[]> = eventRepository.findBySellerPartyAndPremiumCurrency("EMU_BANK", "AUD");
        const prom2: Promise<TradeEvent[]> = eventRepository.findBySellerPartyAndPremiumCurrency("BISON_BANK", "USD");
        return Promise.all([prom1, prom2])
            .then(([events1, events2]) => {
                const combinedEvents = [...events1, ...events2];
                return combinedEvents.filter(event => !isAnagrams(event.buyer_party, event.seller_party));
            })
            .catch(error => {
                // Handle errors
                console.error('Error retrieving trade events:', error);
                return [];
            });
    }

}

function isAnagrams(str1: string, str2: string): boolean {
    // Remove non-alphanumeric characters and convert to lowercase
    const cleanStr1 = str1.replace(/[^\w]/g, '').toLowerCase();
    const cleanStr2 = str2.replace(/[^\w]/g, '').toLowerCase();

    // Sort characters in both strings
    const sortedStr1 = cleanStr1.split('').sort().join('');
    const sortedStr2 = cleanStr2.split('').sort().join('');

    // Check if the sorted strings are equal
    return sortedStr1 === sortedStr2;
}