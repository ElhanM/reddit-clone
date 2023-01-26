import app from "app";
import db from "models";
import { createUsers, createPosts, createCommunities, createComments } from "seeders";

const port = process.env.PORT || 5000;

const dbTesting = async () => {
  createUsers();
  createPosts();
  createCommunities();
  createComments();

  const post = await db.Post.findOne({ where: { title: "post1" } });
  const user = await db.User.findOne({ where: { username: "user1" } });
  // console.log("post:", post?.toJSON());
  // console.log("user:", user?.toJSON());
  // associate user with post
  // await user?.addPost(post);
  await post?.setUser(user);
  const postAssociation = await db.Post.findOne({ where: { title: "post1" }, include: [db.User] });
  console.log("postAssociation:", postAssociation?.toJSON());
};

// IIFE
(async () => {
  try {
    await db.sequelize.sync({ force: true });
    console.log("Database synced!");

    //! remove later on
    dbTesting();

    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log("server.js error:", error);
  }
})();
