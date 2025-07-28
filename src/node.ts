//const express = require("express");
import express from "express";
import 'dotenv/config';
const PORT = process.env.PORT || 8080;
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World! 123");
})

app.get("/abc", (req, res) => {
    res.send("Hello Abc!");
})

app.listen(PORT, () => {
    console.log(`My app is running on port ${PORT}`);
    console.log(`env port ${process.env.PORT}`)
})