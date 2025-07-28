//const express = require("express");
import express from "express";
import 'dotenv/config';
import webRoute from "./routes/web";

const PORT = process.env.PORT || 8080;
const app = express();

//config view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//config routes
webRoute(app);

//config static files: images/css/js
app.use(express.static('public'));
app.listen(PORT, () => {
    console.log(`My app is running on port ${PORT}`);
    console.log(`env port ${process.env.PORT}`)
})