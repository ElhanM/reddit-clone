import app from "app";
import db from "models";

const port = process.env.PORT || 5000;

// IIFE
(async () => {
  try {
    await db.sequelize.sync({ force: true });
    console.log("Database synced!");
    // bulk create 3 users
    await db.User.bulkCreate([
      {
        userId: "97cbf1a0-5b1f-11eb-ae93-0242ac130002",
        username: "user1",
        email: "user1@gmail.com",
        password: "user1",
      },
      {
        userId: "97cbf1a0-5b1f-11eb-ae93-0242ac130003",
        username: "user2",
        email: "user2@gmail.com",
        password: "user2",
      },
    ]);
    // bulk create 2 posts
    await db.Post.bulkCreate([
      {
        postId: "97cbf1a0-5b1f-11eb-ae93-0242ac130004",
        title: "post1",
        description: "post1 description",
      },
      {
        postId: "97cbf1a0-5b1f-11eb-ae93-0242ac130005",
        title: "post2",
        description: "post2 description",
      },
    ]);

    const post = await db.Post.findOne({ where: { title: "post1" } });
    const user = await db.User.findOne({ where: { username: "user1" } });
    console.log("post:", post?.toJSON());
    console.log("user:", user?.toJSON());
    // associate user with post
    await user?.addPost(post);
    // const postAss = await db.Post.findOne({ where: { title: "post1" } });
    // console.log("postAss:", postAss?.toJSON());

    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log("server.js error:", error);
  }
})();
