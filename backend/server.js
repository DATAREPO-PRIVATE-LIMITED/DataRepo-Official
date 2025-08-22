
import { connectDb } from './src/config/db.js'

import { app } from "./app.js"


connectDb()
    .then(() => {
        app.listen((process.env.PORT || 9000), (err) => {
            if (err) return console.log('error while running the server');

            console.log(` server is running on Port : ${process.env.PORT}`);

        })
    }).catch((err) => {
        console.error('Failed to start server:', err.message);
        process.exit(1)

    })