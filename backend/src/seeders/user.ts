import db from "models";

const users = [
  {
    userId: "97cbf1a0-5b1f-11eb-ae93-0242ac130002",
    username: "user1",
    email: "user1@gmail.com",
    password: "user1234",
  },
  {
    userId: "97cbf1a0-5b1f-11eb-ae93-0242ac130003",
    username: "user2",
    email: "user2@gmail.com",
    password: "user2345",
  },
  {
    userId: "97cbf1a0-5b1f-11eb-ae93-0242ac130004",
    username: "user3",
    email: "user3@gmail.com",
    password: "user3456",
  },
];

const createUsers = () => {
  users.map(async user => {
    try {
      const createUser = await db.User.create(user);
      console.log("success", createUser.toJSON());
    } catch (error) {
      console.log(error);
    }
  });
};

export default createUsers;
