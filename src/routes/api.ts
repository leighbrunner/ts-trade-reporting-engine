import { Router, Request, Response } from 'express';
import { TradeEvent } from '../entity/tradeEvent';
import {EventRepository} from "../repository/eventRepository";
import {ReportService} from "../service/reportService";

const router: Router = Router();
const eventRepository: EventRepository = new EventRepository();
const reportService: ReportService = new ReportService();

router.get('/', async (req: Request, res: Response) => {
    const tradeEvents: TradeEvent[] = await reportService.getEmuBankAUDAndBisonBankUSDNonAnagramParties();
    const tradeEventsWithoutId: Omit<TradeEvent, 'id'>[] = tradeEvents.map(({id: number, ...rest}) => rest);
    res.json(tradeEventsWithoutId);
});

router.get('/event/all', async (req: Request, res: Response) => {
    const tradeEvents: TradeEvent[] = await eventRepository.findAllEvents();
    res.json(tradeEvents);
});

router.get('/event/currency/:currency', async (req: Request, res: Response) => {
    const {currency} = req.params;
    const tradeEvents: TradeEvent[] = await eventRepository.findEventsByCurrency(currency);
    res.json(tradeEvents);
});

export default router;
