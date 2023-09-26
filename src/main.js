require("dotenv").config();

const app = require("./application/web");
const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.info("App start...");
});
