import * as http from "http";

import * as cors from "cors";
import * as express from "express";
import * as morgan from "morgan";

import { createRESTfulRoutes } from "./routes/RESTfulRoutes";

interface Options {
  port: number;

  apiKey: string;
}

export function createApiServer({
  port,
  apiKey
}: Options): Promise<http.Server> {
  return new Promise((resolve, reject) => {
    const app = express();

    app.disable("x-powered-by");

    app.use(cors());
    app.use(morgan("tiny"));

    app.use(createRESTfulRoutes({ apiKey }));

    const listener = app.listen(port, (error: Error) => {
      if (error) {
        return reject(error);
      }

      resolve(listener);
    });
  });
}
