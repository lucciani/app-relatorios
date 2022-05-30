import { app } from "./app";

const portApp = process.env.APP_API_PORT;
const hostApp = process.env.APP_API_URL;

app.listen(parseInt(portApp, 10), () =>
  console.log(
    `Server is running on host: ${hostApp} on port: ${parseInt(portApp, 10)}`
  )
);
