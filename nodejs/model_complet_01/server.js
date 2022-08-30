import dotenv from "dotenv";
import express from "express";
import session from "express-session"
import path from "path";
import { fileURLToPath } from "url";

import loginForm from "./routes/routes.js"
import loginSuccess from "./routes/routes.js";
import authMiddleware from "./middleware/authentification.js";


// ==========
// App initialization
// ==========

dotenv.config();
const HOSTNAME = process.env.APP_HOSTNAME;
const PORT = process.env.APP_PORT;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// ==========
// App middlewares
// ==========

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({
      name: "user",
      secret: "sessionSecret",
      resave: false,
      saveUninitialized: true,
    })
);

// const auth

// ==========
// App routers
// ==========

app.use(loginForm);
app.get("/", ({message}, res) =>{
    res.json({message})
})

// ==========
// App start
// ==========

app.listen(PORT, () => {
  console.log(`App listening at http://${HOSTNAME}:${PORT}`);
});
