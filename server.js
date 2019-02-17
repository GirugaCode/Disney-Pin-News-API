const express = require('express')
const bodyParser = require('body-parser')
const logger = require("morgan")
const mongoose = require("mongoose")

// Scrapping Tools
const axios = require("axios")
const cherrio = require("cheerio");

// Initalize Express
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))