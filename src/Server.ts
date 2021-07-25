import { App } from "./App";

import { json } from "express";
import http from 'http';

const app = new App().express;

export const server = http.createServer(app);
