const express = require("express");
const path = require("path");
const connectToDb = require("./db");
const app = express();
const flash = require("connect-flash")
const session = require("express-session")
const staticRoutes = require("./routes/staticRoutes")
const userRoutes = require("./routes/userRoutes")
const notesRoutes = require("./routes/notesRoutes")
var cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 5500
connectToDb();
app.use(cookieParser())
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,"public")))
app.use(session({
    secret: 'kya haal hai mittar', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true
  }));
app.use(flash())
  // Make flash messages available in all views
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});


app.use("/",staticRoutes)
app.use("/user",userRoutes)
app.use("/note",notesRoutes)
app.listen(PORT,()=>{
    console.log("listening on port ",PORT);
})