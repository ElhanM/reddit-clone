import db from "models";

const posts = [
  {
    postId: "73af088f-254c-4ed6-8b89-1470ef26985f",
    title: "post2",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium impedit voluptas exercitationem tenetur in aperiam aliquam ratione fuga excepturi quas? Assumenda quibusdam autem dolorum sint aut ratione nisi laborum repudiandae perferendis exercitationem pariatur magni veritatis voluptatibus, incidunt fugiat officia, quam architecto dicta recusandae asperiores quaerat! Ullam explicabo totam perspiciatis accusamus quidem nam deleniti beatae dicta repellat? Qui distinctio id, amet dolore officiis inventore, quo consectetur quia, esse vel blanditiis autem cumque tempora ducimus. Repellendus quisquam totam quos impedit obcaecati incidunt laboriosam? Laborum minima eum voluptatibus quos eius ab nam perspiciatis, expedita aut tempora cum, mollitia officia, quasi quam recusandae maiores?",
    userId: "311f992b-e482-4a1a-b15d-68252b5d1ac3",
    communityId: "d3c62225-dbbc-4335-b25e-fe06d5edbec1",
  },
  {
    postId: "1f4a2051-7d55-4290-9d54-3ba29ec7cdf4",
    title: "post1",
    // shorter descriptions will have shorter compressed strings
    description: "Short description",
    userId: "eca7aa61-7567-4d1d-befc-b22e3bc372f6",
    communityId: "d3c62225-dbbc-4335-b25e-fe06d5edbec1",
  },
  {
    postId: "dbb15a09-dd18-4407-9484-95cc7b60a1bc",
    title: "post3",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium impedit voluptas exercitationem tenetur in aperiam aliquam ratione fuga excepturi quas? Assumenda quibusdam autem dolorum sint aut ratione nisi laborum repudiandae perferendis exercitationem pariatur magni veritatis voluptatibus, incidunt fugiat officia, quam architecto dicta recusandae asperiores quaerat! Ullam explicabo totam perspiciatis accusamus quidem nam deleniti beatae dicta repellat? Qui distinctio id, amet dolore officiis inventore, quo consectetur quia, esse vel blanditiis autem cumque tempora ducimus. Repellendus quisquam totam quos impedit obcaecati incidunt laboriosam? Laborum minima eum voluptatibus quos eius ab nam perspiciatis, expedita aut tempora cum, mollitia officia, quasi quam recusandae maiores?",
    userId: "311f992b-e482-4a1a-b15d-68252b5d1ac3",
    communityId: "0a22e48d-4a2a-41c0-94d6-949af9d5fe00",
  },
  {
    postId: "35a4671a-85e8-4a90-926b-7f264d04259d",
    title: "post4",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium impedit voluptas exercitationem tenetur in aperiam aliquam ratione fuga excepturi quas? Assumenda quibusdam autem dolorum sint aut ratione nisi laborum repudiandae perferendis exercitationem pariatur magni veritatis voluptatibus, incidunt fugiat officia, quam architecto dicta recusandae asperiores quaerat! Ullam explicabo totam perspiciatis accusamus quidem nam deleniti beatae dicta repellat? Qui distinctio id, amet dolore officiis inventore, quo consectetur quia, esse vel blanditiis autem cumque tempora ducimus. Repellendus quisquam totam quos impedit obcaecati incidunt laboriosam? Laborum minima eum voluptatibus quos eius ab nam perspiciatis, expedita aut tempora cum, mollitia officia, quasi quam recusandae maiores?",
    userId: "eca7aa61-7567-4d1d-befc-b22e3bc372f6",
    communityId: "1dbd35c9-cc57-4635-afb3-9f8825516bd1",
  },
  {
    postId: "ecde4c65-2515-41c4-a987-99b7ea16e509",
    title: "post5",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium impedit voluptas exercitationem tenetur in aperiam aliquam ratione fuga excepturi quas? Assumenda quibusdam autem dolorum sint aut ratione nisi laborum repudiandae perferendis exercitationem pariatur magni veritatis voluptatibus, incidunt fugiat officia, quam architecto dicta recusandae asperiores quaerat! Ullam explicabo totam perspiciatis accusamus quidem nam deleniti beatae dicta repellat? Qui distinctio id, amet dolore officiis inventore, quo consectetur quia, esse vel blanditiis autem cumque tempora ducimus. Repellendus quisquam totam quos impedit obcaecati incidunt laboriosam? Laborum minima eum voluptatibus quos eius ab nam perspiciatis, expedita aut tempora cum, mollitia officia, quasi quam recusandae maiores?",
    userId: "311f992b-e482-4a1a-b15d-68252b5d1ac3",
    communityId: "1dbd35c9-cc57-4635-afb3-9f8825516bd1",
  },
  {
    postId: "f7148ace-499a-4219-899f-f9af94d831ca",
    title: "post6",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium impedit voluptas exercitationem tenetur in aperiam aliquam ratione fuga excepturi quas? Assumenda quibusdam autem dolorum sint aut ratione nisi laborum repudiandae perferendis exercitationem pariatur magni veritatis voluptatibus, incidunt fugiat officia, quam architecto dicta recusandae asperiores quaerat! Ullam explicabo totam perspiciatis accusamus quidem nam deleniti beatae dicta repellat? Qui distinctio id, amet dolore officiis inventore, quo consectetur quia, esse vel blanditiis autem cumque tempora ducimus. Repellendus quisquam totam quos impedit obcaecati incidunt laboriosam? Laborum minima eum voluptatibus quos eius ab nam perspiciatis, expedita aut tempora cum, mollitia officia, quasi quam recusandae maiores?",
    userId: "eca7aa61-7567-4d1d-befc-b22e3bc372f6",
    communityId: "1dbd35c9-cc57-4635-afb3-9f8825516bd1",
  },
];

const createPosts = async () => {
  try {
    await db.Post.bulkCreate(posts, {
      runValidators: true,
    });
    await db.Post.create({
      postId: "8ce67c5c-99d8-46c7-9a90-615cb0ec3617",
      title: "New post",
      description: "New post",
      userId: "eca7aa61-7567-4d1d-befc-b22e3bc372f6",
      communityId: "d3c62225-dbbc-4335-b25e-fe06d5edbec1",
    });
  } catch (error) {
    console.log(error);
  }
};

export default createPosts;
