/* eslint-disable no-console */
import app from './app';
import mongoose from 'mongoose';
import config from './app/config';

const PORT = 8080;

async function main() {
    try {
        await mongoose.connect(config.database_url as string); // Database connection

        app.listen(config.port, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error(err);
    }
}

main();
