import * as dotenv from 'dotenv';
dotenv.config({
    path: __dirname + '/../.env'
});
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import router from '@routes/index';
const app = express();
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(router);

export default app;