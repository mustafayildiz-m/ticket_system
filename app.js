const express = require('express')
const fileUpload = require('express-fileupload')
var bodyParser = require('body-parser')
const app = express();
const exphbs = require('express-handlebars');
const mongoose = require("mongoose");
const port = 3000;
const hostname = '127.0.0.1'
const database = 'mongotickets_db'
const moment = require('moment')
const generateDate = require('./helpers/generateDate').generateDate
var session = require('express-session')


app.use(express.static('public'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())

mongoose.connect(`mongodb://${hostname}/${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(session({
    secret: "test",
    saveUninitialized: true,
    resave: false,

}));


app.use(fileUpload())

const hbs = exphbs.create({
    helpers: {
        generateDate: generateDate
    }
})


app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

const main = require('./routes/main')
const posts = require('./routes/posts')
const answered_tickets = require('./routes/answered_tickets')
const users = require('./routes/users')
app.use('/', main)
app.use('/posts', posts)
app.use('/users', users)
app.use('/answered_tickets', answered_tickets)


app.listen(port, hostname, () => {
    console.log(`Server Running @ http://${hostname}:${port}`)
})
