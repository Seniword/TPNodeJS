export default function home(req, res) {
  let message = req.session.message;
  req.session.destroy();
  res.render("home", {message : message})
}
