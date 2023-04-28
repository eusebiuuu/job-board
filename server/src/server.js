const http = require('http');
const app = require('./app.js');
const { connectToMongoDB } = require('./services/connect.mongo.js');
require(dotenv.config());

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