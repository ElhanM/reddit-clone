import { createUsers, createPosts, createCommunities, createComments, createCommunityUsers } from "seeders";

const runSeeders = async () => {
  await createUsers();
  await createCommunities();
  await createPosts();
  await createComments();
  await createCommunityUsers();
};

export default runSeeders;
