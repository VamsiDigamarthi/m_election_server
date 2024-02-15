import express from "express";
import cors from "cors";
import http from "http";
// import { db } from "./Database";
import bodyParser from "body-parser";
import cluster from "cluster";
import { cpus } from "os";
const numCPUs = cpus().length;
// route
import AuthRoute from "./Routes/AuthRoute.js";
import { initDb } from "./Database/mongoDb.js";
import StateRoute from "./Routes/StateRoute.js";
import DistrictRoute from "./Routes/DistrictRoute.js";
import UserRoute from "./Routes/UserRoute.js";
import PaymentRoute from "./Routes/PaymentRoute.js";
// import mongoose from "mongoose";
const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const server = http.createServer(app);
// mongoose
//   .connect(
//     "mongodb+srv://vams:vamsi08050321@cluster0.iklm77i.mongodb.net/election?retryWrites=true&w=majority"
//   )
//   .then(() =>
//     server.listen(process.env.PORT || 5001, () =>
//       console.log("Listening server at 5001 and connect db ........")
//     )
//   )
//   .catch((error) => console.log(`this is db not connected ${error}`));

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  // const server = http.createServer(app);
  // // const server = http.createServer(app);
  // server.listen(PORT, () => {
  //   console.log(`Server running on port ${PORT}`);
  // });
  initDb((err, db) => {
    if (err) {
      console.log(err);
    } else {
      server.listen(process.env.PORT || 5001, () =>
        console.log("Listening server at 5001 and connect db ........")
      );
    }
  });
}

app.use("/auth", AuthRoute);
app.use("/state", StateRoute);
app.use("/user", UserRoute);
app.use("/district", DistrictRoute);
app.use("/payment", PaymentRoute);
