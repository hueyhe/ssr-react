import express from 'express';

import { renderer } from './middlewares/renderer';

const app = express();

app.use(renderer());

export { app };
