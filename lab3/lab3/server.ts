import { createServer } from "https";
import { readFileSync } from "fs";
import { join } from "path";
import next from "next";


const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
    key: readFileSync(join(__dirname, "localhost-key.pem")),
    cert: readFileSync(join(__dirname, "localhost.pem")),
};

app.prepare().then(() => {
    createServer(httpsOptions, (req, res) => {
        handle(req, res);
    }).listen(3000, () => {
        console.log("> HTTPS server running at https://localhost:3000");
    });
});
