import { getGameOfTheDay } from "./firestore";

export { }
const path = require("path");
const express = require("express");
const bodyParser = require('body-parser')
const app = express(); // create express app


require('dotenv').config();

// add middlewares
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/test", (req: any, res: any) => {
  res.json({ message: "Hello from server!" });
});

// Routes
app.use('/api/discord', require('./discord'));

app.use('/api/challenges', require('./challenges'));

app.use('/api/users', require('./users'))

app.get("/api/gotd", function (req: any, res: any) {
  return getGameOfTheDay().then((response) => {
    res.send(response)
  }).catch((err) => {
    res.status(400).send(err)
  })
});

app.use((req: any, res: any, next: any) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// start express server on port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log("server started on port 3000");
});

app.use((err: any, req: any, res: any, next: any) => {
  switch (err.message) {
    case 'NoCodeProvided':
      return res.status(400).send({
        status: 'ERROR',
        error: err.message,
      });
    default:
      return res.status(500).send({
        status: 'ERROR',
        error: err.message,
      });
  }
});