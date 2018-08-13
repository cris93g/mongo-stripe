require("dotenv").config()
const express = require("express");
const cors = require("cors");
const {
    json
} = require("body-parser");
const session = require("express-session");
const massive = require("massive");
const app = express();
const path = require("path")
const passport = require("passport")
const mongoose = require("mongoose");
const port = process.env.port || 3001;
app.use(cors());
app.use(json());

//auth
const {
    getUser,
    strat,
    logout
} = require(`${__dirname}/servCtrl/authCtrl`);
//session
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 100000
        }
    })
);


//Connect to MongoDB
const db = process.env.mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("eyy running that mongo!"))
  .catch(err => console.log(err));





//sets db

massive(process.env.CONNECTION_STRING).then(dbinstance => {
    app.set("db", dbinstance);
});


//passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(strat);



passport.serializeUser((user, done) => {
    const db = app.get("db");
    db.getUserByAuthid([user.id])
        .then(response => {
            if (!response[0]) {
                db.addUserByAuthid([user.displayName, user.id, user.picture])
                    .then(res => done(null, res[0]))
                    .catch(console.log);
            } else return done(null, response[0]);
        })
        .catch(console.log);
});

passport.deserializeUser((user, done) => done(null, user));

app.get("/me", getUser);

app.get(
    "/login",
    passport.authenticate("auth0", {
        // successRedirect: "/",
        successRedirect: "http://localhost:3000/#/",
        // successRedirect: "/#/",
        failureRedirect: "/login"
    })
);

//tells server to listen
app.listen(port, () => {
    console.log(`eyy lets go at port ${port}`);
});