const cors = require("cors");

const useCors = (app) => {
  app.use(
    cors({
      origin: "/",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );
};

module.exports = useCors;
