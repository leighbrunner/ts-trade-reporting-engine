import express, {Express} from 'express';
import apiRouter from './routes/api';
import {AppDataSource} from './db';
import {loadAndSaveEventsFromXML} from "./utils/loadEvents";

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 3000;
const directoryPath: string = process.env.XML_DIRECTORY || './data';

app.use(express.json());
app.use(apiRouter);

app.listen(PORT, async () => {
    await AppDataSource.initialize()
        .then(() => {
            console.log("Data Source has been initialized")
        })
        .catch((err) => {
            console.error("Error during Data Source initialization", err)
        })
    await loadAndSaveEventsFromXML(directoryPath)
        .then(() => console.log('All XML files loaded and saved to database.'))
        .catch((error) => console.error('Error:', error));
    console.log(`Server is running on http://localhost:${PORT}`);
});
