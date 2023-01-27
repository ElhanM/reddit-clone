import app from "app";
import db from "models";
import { runSeeders } from "seeders";

const port = process.env.PORT || 5000;

// IIFE
(async () => {
  try {
    await db.sequelize.sync({ force: true });
    // await db.sequelize.sync({ alter: true });

    console.log("Database synced!");

    //! remove later on
    runSeeders();

    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log("server.js error:", error);
  }
})();
