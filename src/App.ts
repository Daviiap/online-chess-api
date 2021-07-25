import express, { Application, json } from "express";
import cors from "cors";

export class App {
  public express: Application;

  public constructor(middlewares?: any[]) {
    this.express = express();
    this.setMiddlewares(middlewares);
    this.setRoutes();
  }

  private setMiddlewares(middlewares?: any[]): void {
    this.express.use(cors());
    this.express.use(json());
  }

  private setRoutes(): void {
    this.express.get("/", (_, res) => {
      return res.status(200).json();
    });
  }
}
