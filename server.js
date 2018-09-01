const express = require("express");
const hbs = require("hbs")
const fs = require("fs")

const port  = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set("view engine ", hbs);


hbs.registerHelper("getCurrentYear", () =>{
    return new Date().getFullYear();
})

hbs.registerHelper("screamIt", (text) =>{
    return text.toUpperCase();
})

app.use((req, res, next) =>{
    let now = new Date().toString();
    let log = `${now} : ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile("server.log", log + "\n", (err) =>{
        if(err){
            console.log("Unable to append server.log")
        }
    })

    next();
})

// app.use((req, res,next) =>{
//     res.render( "maintenance.hbs")
// })

app.use(express.static(__dirname+ "/public"))

app.get("/", (req,res) =>{
  res.render("home.hbs", {
      pageTitle : "Home Page",
      welcomeMessage : "Hello..... Welcome to Home Page"
  })
})

app.get("/about", (req,res) =>{
    res.render("about.hbs", {
        pageTitle : "About Page",
    });
})

app.get("/project", (req, res) =>{
    res.render("project.hbs", {
        pageTitle : 'Project'
    })
})

app.get("/bad", (req, res) =>{
    res.send({
        Error: "Unable to handle the Request"
    })
})
app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});