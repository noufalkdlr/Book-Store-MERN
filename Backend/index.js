import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";

import bookRoute from "./routes/bookRoute.js";

const app = express();

app.use(express.json());

app.use(cors())

// app.use(cors({
//     origin:'',
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type']
// }))

app.get("/", (requst, response) => {
  console.log(requst);
  return response.status(234).send("Book store");
});

app.use('/books', bookRoute )

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening port:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
