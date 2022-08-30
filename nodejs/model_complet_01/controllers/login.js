import dotenv from "dotenv";

dotenv.config();

const HOSTNAME = process.env.APP_HOSTNAME;
const PORT = process.env.APP_PORT;

export default function loginController(req, res) {
    res.send(
        `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Hello Express App!</title>
        <link rel="stylesheet" href="http://${HOSTNAME}:${PORT}/css/styles.css"/>
      </head>
      <body>
        <div class="main-block">
          <h1>Registration</h1>
          <form action="/login_successful" method="post">
            <hr>
            <div class="account-type">
              <input type="radio" value="personal" id="radioOne" name="account" checked/>
              <label for="radioOne" class="radio">Personal</label>
              <input type="radio" value="company" id="radioTwo" name="account" />
              <label for="radioTwo" class="radio">Company</label>
            </div>
            <hr>
            <label id="icon" for="name"><i class="fas fa-envelope"></i></label>
            <input type="text" name="name" id="name" placeholder="Email" required/>
            <label id="icon" for="name"><i class="fas fa-user"></i></label>
            <input type="text" name="name" id="name" placeholder="Name" required/>
            <label id="icon" for="name"><i class="fas fa-unlock-alt"></i></label>
            <input type="password" name="name" id="name" placeholder="Password" required/>
            <hr>
            <div class="gender">
              <input type="radio" value="male" id="male" name="gender" checked/>
              <label for="male" class="radio">Male</label>
              <input type="radio" value="female" id="female" name="gender" />
              <label for="female" class="radio">Female</label>
            </div>
            <hr>
            <div class="btn-block">
              <p>By clicking Register, you agree on our <a href="https://www.w3docs.com/privacy-policy">Privacy Policy for W3Docs</a>.</p>
              <button type="submit" href="/">Submit</button>
            </div>
          </form>
        </div>
      </body>
    </html>`
    );
};