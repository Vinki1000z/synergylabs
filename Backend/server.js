const express = require("express");
const app = express();
const port = 5000;

// cors setup
const cors=require("cors");
app.use(cors());


app.use(express.json());
// ad
// app.use("/api",);
// GET Endpoint
app.get('/', (req, res) => {
    res.send("Hello there");
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })