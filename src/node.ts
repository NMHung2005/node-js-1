//const express = require("express");
import express from "express";
const PORT = 8080;
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.get("/abc", (req, res) => {
    res.send("Hello Abc!");
})

app.listen(PORT, () => {
    console.log(`My app is running on port ${PORT}`);
})