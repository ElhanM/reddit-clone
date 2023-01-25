import app from "app";
import db from "config/config";
import { User } from "models/user";
import { Post } from "models/post";

const port = process.env.PORT || 5000;

// IIFE
(async () => {
  try {
    await db.sync({ force: true });
    console.log("Database synced!");
    // bulk create 3 users
    await User.bulkCreate([
      {
        username: "user1",
        email: "user1@gmail.com",
        password: "user1",
      },
      {
        username: "user2",
        email: "user2@gmail.com",
        password: "user2",
      },
    ]);
    // bulk create 2 posts
    await Post.bulkCreate([
      {
        title: "post1",
        description: "post1 description",
      },
      {
        title: "post2",
        description: "post2 description",
      },
    ]);

    const post = await Post.findOne({ where: { title: "post1" } });
    const user = await User.findOne({ where: { username: "user1" } });
    console.log("post:", post?.toJSON());
    console.log("user:", user?.toJSON());

    // if (post && user) {
    //   await post.setUser(user);
    // }

    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log("server.js error:", error);
  }
})();
