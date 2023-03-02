require("dotenv/config");
require("./db");
const express = require("express");

const { isAuthenticated } = require("./middleware/jwt.middleware");


const app = express();
require("./config")(app);

const picturesRoutes = require("./routes/pictures.routes")
app.use("/api", picturesRoutes)

const indexRoutes = require("./routes/index.routes")
app.use("/api", indexRoutes)

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

require("./error-handling")(app);

module.exports = app;