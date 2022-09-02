import dotenv from "dotenv";
import express from "express";
import session from "express-session"
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose"

import route from "./routes/routes.js";

// ==========
// App initialization
// ==========

dotenv.config();
const { APP_LOCALHOST : localhost, APP_PORT : port, NODE_ENV } = process.env;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.set("view engine", "pug");
app.locals.pretty = (NODE_ENV !== 'production'); // Indente correctement le HTML envoyé au client (utile en dev, mais inutile en production)

// ==========
// App middlewares
// ==========
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
  name: 'simple',
  secret: 'simple',
  resave: false,
  saveUninitialized: true,
}));

mongoose.connect('mongodb://127.0.0.1:27017/users?compressors=none', {
  useNewUrlParser: true,
  useUnifiedTopology: true, // options qui évitent des warnings inutiles
})
    .then(init);

async function init(){}


// ==========
// App routers
// ==========
try{
  app.use("/", route);
}catch(err)
{
  console.error(err.message)
}

// ==========
// App start
// ==========

app.listen(port, () => {
  console.log(`App listening at http://${localhost}:${port}`);
});
