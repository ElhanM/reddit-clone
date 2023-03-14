import db from "models";

const communities = [
  {
    communityId: "d3c62225-dbbc-4335-b25e-fe06d5edbec1",
    name: "learnprogramming",
    description: "A subreddit for all questions related to programming in any language.",
  },
  {
    communityId: "0a22e48d-4a2a-41c0-94d6-949af9d5fe00",
    name: "IAmA",
    description: "I Am A, where the mundane becomes fascinating and the outrageous suddenly seems normal.",
  },
  {
    communityId: "1dbd35c9-cc57-4635-afb3-9f8825516bd1",
    name: "AskReddit",
    description: "r/AskReddit is the place to ask and answer thought-provoking questions.",
  },
];

const communities2 = [
  {
    communityId: "5604a169-ad0e-40e6-9a02-914e75b3aa77",
    name: "Showerthoughts",
    description: "A subreddit for sharing those miniature epiphanies you have that highlight the oddities within the familiar.",
  },
  {
    communityId: "bc106b73-ce6c-4a13-9341-1884786c8b86",
    name: "funny",
    description: "Welcome to r/Funny, Reddit's largest humour depository.",
  },
  {
    communityId: "7249ea5b-abe9-4d50-aca6-ad416225914c",
    name: "gaming",
    description: "A subreddit for (almost) anything related to games - video games, board games, card games, etc. (but not sports).",
  },
  {
    communityId: "4d569b97-9084-48c1-8598-9d0486c33b05",
    name: "teenagers",
    description:
      "r/teenagers is the biggest community forum run by teenagers for teenagers. Our subreddit is primarily for discussions and memes that an average teenager would enjoy to discuss about. We do not have any age-restriction in place but do keep in mind this is targeted for users between the ages of 13 to 19. Parents, teachers, and the like are welcomed to participate and ask any questions!",
  },
  {
    communityId: "f5ef6ce8-c6df-439f-954a-add2f3381f13",
    name: "memes",
    description:
      "Memes! A way of describing cultural information being shared. An element of a culture or system of behavior that may be considered to be passed from one individual to another by nongenetic means, especially imitation.",
  },
  {
    communityId: "bc5c88c8-6134-45a6-8af6-bf5556bdf742",
    name: "Backend",
    description: "For back-end programming discussion.",
  },
  {
    communityId: "cf0389bf-fcc0-475f-9528-30d4a8c5b1b4",
    name: "bih",
    description:
      "Welcome to the largest online Bosnian and Herzegovinian community. Here we discuss, promote, and share various topics related to the country of Bosnia and Herzegovina, located in the heart of the Balkan peninsula.",
  },
  {
    communityId: "9ecf99fc-f747-42a6-9bb2-b093204a1353",
    name: "cscareerquestions",
    description: "A subreddit for those with questions about working in the tech industry or in a computer-science-related job.",
  },
  {
    communityId: "a2b982d5-3397-49dd-a598-1a262a151b0e",
    name: "csMajors",
    description: "All about studying and students of computer science.",
  },
  {
    communityId: "9df9587f-3a90-4b3a-af7d-10cd1258436b",
    name: "Damnthatsinteresting",
    description: "The most interesting place on reddit",
  },
  {
    communityId: "b08853bf-4fc7-4517-b31d-a5574627db47",
    name: "developer",
    description: "The home for developers. Post your projects, get inspiration and receive help.",
  },
  {
    communityId: "b97b31a6-b750-40ac-9162-00e793b95ef3",
    name: "Frontend",
    description:
      "r/frontend is a subreddit for front end web developers who want to move the web forward or want to learn how. If you're looking to find or share the latest and greatest tips, links, thoughts, and discussions on the world of front web development, this is the place to do it.",
  },
  {
    communityId: "3b8e0a00-f72b-428d-a156-b52da3fa5d7d",
    name: "git",
    description: "Welcome to git",
  },
  {
    communityId: "f0b55b5f-6cd7-4a30-bb4a-299f75742fd4",
    name: "hardware",
    description:
      "The goal of /r/hardware is a place for quality hardware news, reviews, and intelligent discussion. /r/hardware IS NOT the place to come for help of any kind. Techsupport and PC building questions should be posted to r/techsupport or r/buildapc instead.",
  },
  {
    communityId: "703b9827-5fb8-404c-8bbb-bd9c0a005e03",
    name: "learnjavascript",
    description:
      "This subreddit is for anyone who wants to learn JavaScript or help others do so. Questions and posts about frontend development in general are welcome, as are all posts pertaining to JavaScript on the backend.",
  },
  {
    communityId: "486b60e7-0c41-4746-97bf-e4dd044b7194",
    name: "leetcode",
    description: "Discuss interview prep strategies and leetcode questions",
  },
  {
    communityId: "2b8fa5e7-dcad-4609-b2e5-10fd8439ebf8",
    name: "linux",
    description:
      "All things Linux and GNU/Linux -- this is neither a community exclusively about the kernel Linux, nor is exclusively about the GNU Operating System.",
  },
];

const createCommunities = async () => {
  try {
    await db.Community.bulkCreate(communities, {
      runValidators: true,
    });
    // createing too many communities at once causes an error where other seeders start going off before the communities are created
    // which starts violating foreign key constraints
    await db.Community.bulkCreate(communities2, {
      runValidators: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export default createCommunities;
