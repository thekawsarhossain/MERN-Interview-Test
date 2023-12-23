import express, { Application } from 'express';
import cors from 'cors';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

// Express App Initializations
const app: Application = express();

app.use(cors({ origin: ['http://localhost:5173'] }));

// Parser
app.use(express.json());

// Routes
// app.use('/api/v1', );

app.use(globalErrorHandler); // Error handler
app.use(notFound); //Not Found

export default app;
