import {createEvent} from "./loadEvents";
import {DOMParser} from "xmldom";
import {TradeEvent} from "../entity/tradeEvent";


test('Create TradeEvent from XML', () => {
    const xmlContent: string = `
<?xml version="1.0" encoding="utf-8"?>
<requestConfirmation xmlns="http://www.fpml.org/FpML-5/confirmation">
    <trade>
        <buyerPartyReference href="buyer"/>
        <sellerPartyReference href="seller"/>
        <paymentAmount>
            <amount>10.40</amount>
            <currency>USD</currency>
        </paymentAmount>
    </trade>
</requestConfirmation>`;

    const xmlDoc: Document = new DOMParser().parseFromString(xmlContent);

    const event: TradeEvent = createEvent(xmlDoc);

    expect(event.seller_party).toBe('seller');
    expect(event.buyer_party).toBe('buyer');
    expect(event.premium_currency).toBe('USD');
    expect(event.premium_amount).toBe(10.40);
});

test('Create TradeEvent from XML without premium amount', () => {
    const xmlContent: string = `
<?xml version="1.0" encoding="utf-8"?>
<requestConfirmation xmlns="http://www.fpml.org/FpML-5/confirmation">
    <trade>
        <buyerPartyReference href="buyer"/>
        <sellerPartyReference href="seller"/>
        <paymentAmount>
            <currency>USD</currency>
        </paymentAmount>
    </trade>
</requestConfirmation>`;

    const xmlDoc: Document = new DOMParser().parseFromString(xmlContent);

    const event: TradeEvent = createEvent(xmlDoc);

    expect(event.seller_party).toBe('seller');
    expect(event.buyer_party).toBe('buyer');
    expect(event.premium_currency).toBe('USD');
    expect(event.premium_amount).toBe(NaN);
});
