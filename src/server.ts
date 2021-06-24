import app from './app';
import http from 'http';
import sendNewlyAddedCoinUpdate from '@jobs/sendNewlyAddedCoins';
import {HTTP_PORT as port} from '@constants/index';

const server = http.createServer(app);

server.listen(port, async ()=> {
    console.log(process.env.MY_EMAIL)
    let task = sendNewlyAddedCoinUpdate();
    task.cron.start();
    console.log(`Server listening to port ${port}`);
});