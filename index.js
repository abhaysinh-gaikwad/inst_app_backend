const express = require("express");
const { connection } = require("./config/db");
const {userRouter} = require("./routes/user.routes");
const { pictureRouter } = require("./routes/picture.routes");
const multer  = require('multer')
var cors = require('cors')

require("dotenv").config();

const app = express();
app.use(express.json(), cors());

app.get('/', (req, res)=>{
  res.status(200).send({msg: "Welcome to Home page"});
})

app.use("/users", userRouter)
app.use("/pictures", pictureRouter)

app.listen(process.env.port, async () => { 
  try {
    await connection;
    console.log(`Connnected to port ${process.env.port}`);
  } catch (err) {
    console.log(err); 
  }
}); 
