import express, { Router } from 'express';

const app = express();
app.use(express.json());

const boiler = Router();

app.use(boiler);

export default app;
