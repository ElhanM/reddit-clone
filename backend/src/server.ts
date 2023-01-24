import app from "app";
import db from "models";

const port = process.env.PORT || 5000;

// IIFE
(async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Database sync...");
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log("server.js error:", error);
  }
})();
