import fs from 'fs';
import path from 'path';
import {TradeEvent} from "../entity/tradeEvent";
import { DOMParser } from 'xmldom';
import * as xpath from 'xpath';
import {XPathSelect} from "xpath";
import {EventRepository} from "../repository/eventRepository";

const eventRepository: EventRepository = new EventRepository();

/**
 * Loads and saves XML files from a given directory path.
 *
 * @param {string} directoryPath - The path to the directory containing the XML files.
 * @return {Promise<void>} - A Promise that resolves when all files are processed successfully.
 */
export async function loadAndSaveEventsFromXML(directoryPath: string): Promise<void> {
    try {
        // Find the files in the directory
        const files: string[] = await fs.promises.readdir(directoryPath);

        // Process each file
        await Promise.all(files.map(async (file: string) => {
            // Check if the file is XML
            if (path.extname(file) === '.xml') {
                const filePath: string = path.join(directoryPath, file);

                // Read the XML file
                const xmlString: string = await fs.promises.readFile(filePath, 'utf-8');

                // Parse the XML
                const xmlDoc: Document = new DOMParser().parseFromString(xmlString);

                // Save to the database
                const tradeEvent: TradeEvent = createEvent(xmlDoc);
                eventRepository.saveEvent(tradeEvent)
                    .then(() => console.log(`Saved ${file} to the database.`))
                    .catch((error) => console.error('Error:', error))
            }
        }));

        console.log('All files processed successfully.');
    } catch (error) {
        console.error('Error occurred while processing files:', error);
    }
}

/**
 * Creates an Item object based on the given XML document.
 *
 * @param {Document} xmlDoc - The XML document to extract data from.
 * @return {TradeEvent} - The created Item object.
 */
export function createEvent(xmlDoc: Document): TradeEvent {
    const item: TradeEvent = new TradeEvent();
    const select: XPathSelect = xpath.useNamespaces({"ns": "http://www.fpml.org/FpML-5/confirmation"});

    const buyerPartyAttr: Attr = select("//ns:buyerPartyReference/@href", xmlDoc, true) as Attr;
    item.buyer_party = buyerPartyAttr?.value;

    const sellerPartyAttr: Attr = select("//ns:sellerPartyReference/@href", xmlDoc, true) as Attr;
    item.seller_party = sellerPartyAttr?.value;

    const paymentAmountText: Text = select("//ns:paymentAmount/ns:amount/text()", xmlDoc, true) as Text;
    item.premium_amount = +paymentAmountText?.data;

    const paymentCurrencyText: Text = select("//ns:paymentAmount/ns:currency/text()", xmlDoc, true) as Text;
    item.premium_currency = paymentCurrencyText?.data;

    return item;
}