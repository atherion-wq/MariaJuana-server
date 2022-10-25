
//npm install mongodb express cors dotenv

const express = require("express");
const app = express();
const cors = require("cors");


const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
app.use(require("./record"));


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});