const express = require("express")
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
app.use(express.static('public'))
require("./models/index");

const routesFile = require("./controllers/routeControl.js");


app.use("/api/v1", routesFile);
app.get("/", (req,res)=> {
    res.json({
        success : true,
        message : "its node project of marketplace",

    })
  })

module.exports = app;




