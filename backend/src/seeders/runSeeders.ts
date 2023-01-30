import { createUsers, createPosts, createCommunities, createComments, createCommunityUsers, postUpvotes } from "seeders";

const runSeeders = async () => {
  await createUsers();
  await createCommunities();
  await createPosts();
  await postUpvotes();
  await createComments();
  await createCommunityUsers();
};

export default runSeeders;
