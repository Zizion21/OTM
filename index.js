const Application= require("./app/server");
const DB_URL= "mongodb://localhost:27017/OTM_Project";
require("dotenv").config();
new Application(4500, DB_URL);