const connectToMongoDB = require("./db");
const express = require("express");

const app = express();
const port = 5000;

connectToMongoDB();

var cors = require("cors");

app.use(cors());
// MIDDLEWARE FOR JSON :
app.use(express.json())

// ROUTES :
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
    console.log(`You are Live on the port ${port}`)
})