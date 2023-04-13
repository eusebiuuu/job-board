import http from 'http'
import app from './app.mjs'
import * as dotenv from 'dotenv'
import { connectToMongoDB } from './services/connect.mongo.mjs';
dotenv.config();

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

async function startServer() {
    try {
        await connectToMongoDB();
        server.listen(PORT, () => {
            console.log(`The server is listening on port ${PORT}...`);
        });
    } catch (err) {
        console.log(err);
    }
}

await startServer();