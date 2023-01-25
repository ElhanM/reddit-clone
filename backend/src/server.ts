import app from "app";
import db from "config/config";
import { UserInstance } from "models/user";

const port = process.env.PORT || 5000;

// IIFE
(async () => {
  try {
    await db.sync({ force: true });
    console.log("Database sync...");
    // create user
    await UserInstance.create({
      username: "elco",
    });
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log("server.js error:", error);
  }
})();
