import { AddressInfo } from "net";

import { toInteger, trim } from "lodash";

import { createApiServer } from "./api-server";

const { APP_PORT = 3010, APP_API_KEY } = process.env;

createApiServer({
  port: toInteger(APP_PORT),
  apiKey: trim(APP_API_KEY)
})
  .then(app => {
    const { port } = app.address() as AddressInfo;

    // eslint-disable-next-line no-console
    console.log("Started on http://localhost:%d", port);
  })
  .catch((e: Error) => {
    // eslint-disable-next-line no-console
    console.error(e);

    process.exit(1);
  });
