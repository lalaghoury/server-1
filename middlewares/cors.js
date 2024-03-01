const cors = require("cors");

const useCors = (app) => {
  app.use(
    cors({
      origin: "https://teal-vivacious-cygnet.cyclic.app",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );
};

module.exports = useCors;
