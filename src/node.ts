import express from "express";
import 'dotenv/config';
import webRoute from "./routes/web";


const PORT = process.env.PORT || 8080;
const app = express();

//config view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config static files: images/css/js
app.use(express.static('public'));

//config routes
webRoute(app);



app.listen(PORT, () => {
    console.log(`My app is running on port ${PORT}`);
})