require('dotenv').config({ path: "./.env" });
const express = require("express");
const cors = require("cors");
const passport = require("passport");
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
const passportSetup = require("./passport");
const authRoute = require("./router/auth");
const { router } = require('./router/routes')
const app = express();
const mongoose = require("mongoose");
const url = "mongodb+srv://abishek:abishek@cluster0.ynkm5pm.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
}).catch((e) => {
    console.log(e);
});
const store = new MongoDBStore({
    uri: url,
    collection: 'mySessions'
});
app.use(session({
    secret: '641958e3f2d9d7a30e2608fe',
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    },
    saveUninitialized: false,
    resave: false,
    store: store
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    origin: "https://ui-dmxo.onrender.com",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));
app.use(express.json())
app.use('/api', router);
app.use("/auth", authRoute);
const port = process.env.PORT ||8080;
app.listen(port, () => console.log(`listening on port ${port}`))