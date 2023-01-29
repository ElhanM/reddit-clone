import db from "models";

const users = [
  {
    userId: "eca7aa61-7567-4d1d-befc-b22e3bc372f6",
    username: "user1",
    email: "user1@gmail.com",
    password: "user1234",
  },
  {
    userId: "311f992b-e482-4a1a-b15d-68252b5d1ac3",
    username: "user2",
    email: "user2@gmail.com",
    password: "user2345",
  },
  {
    userId: "a8bce593-1c89-40a9-a39d-e9a9dab64a97",
    username: "user3",
    email: "user3@gmail.com",
    password: "user3456",
  },
  {
    userId: "81de75b1-8ebe-47ae-8b8d-95f0c2aae8ba",
    username: "elhan",
    email: "elhan@gmail.com",
    password: "elhan1234",
  },
];

const createUsers = async () => {
  try {
    await db.User.bulkCreate(users, { runValidators: true });
  } catch (error) {
    console.log(error);
  }
};

export default createUsers;
