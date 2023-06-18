const express = require('express')
const cors = require("cors")
const cookieParser = require('cookie-parser')

const app = express();

// config cors
app.use(cors());

// parse  request of content-type application/json
app.use(express.json());

// // parse  request of content-type application/x-www-form-urlencoded
app.use(
    express.urlencoded({extended:true})
);
//setting up cookies
app.use(cookieParser());

const db =  require("./app/models/db");
db.mongoose
    .connect(db.url , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>{
        console.log("connected to the database");
    })
    .catch((err)=>{
        console.log("failed to connect to database" , err);
        process.exit();
    })

    app.get("/", (req,res)=>{
        res.json({message:"welcome to voting management System"});        
    })

    require('./app/routes/user.routes')(app)

    module.exports= app;