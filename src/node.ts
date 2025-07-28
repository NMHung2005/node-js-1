//const express = require("express");
import express from "express";
import 'dotenv/config';

const PORT = process.env.PORT || 8080;
const app = express();

//config view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get("/", (req, res) => {
    res.render('home')
})

app.get("/abc", (req, res) => {
    res.send("Hello Abc!");
})

app.listen(PORT, () => {
    console.log(`My app is running on port ${PORT}`);
    console.log(`env port ${process.env.PORT}`)
})