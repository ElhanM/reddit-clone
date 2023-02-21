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
  {
    postId: "07a63848-6abf-4570-b7ea-95d00430a01c",
    title: "post7",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium impedit voluptas exercitationem tenetur in aperiam aliquam ratione fuga excepturi quas? Assumenda quibusdam autem dolorum sint aut ratione nisi laborum repudiandae perferendis exercitationem pariatur magni veritatis voluptatibus, incidunt fugiat officia, quam architecto dicta recusandae asperiores quaerat! Ullam explicabo totam perspiciatis accusamus quidem nam deleniti beatae dicta repellat? Qui distinctio id, amet dolore officiis inventore, quo consectetur quia, esse vel blanditiis autem cumque tempora ducimus. Repellendus quisquam totam quos impedit obcaecati incidunt laboriosam? Laborum minima eum voluptatibus quos eius ab nam perspiciatis, expedita aut tempora cum, mollitia officia, quasi quam recusandae maiores?",
    userId: "eca7aa61-7567-4d1d-befc-b22e3bc372f6",
    communityId: "1dbd35c9-cc57-4635-afb3-9f8825516bd1",
  },
  {
    postId: "9b7a0a0c-ff8d-46ba-a509-79fe58ec2dc1",
    title: "post8",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium impedit voluptas exercitationem tenetur in aperiam aliquam ratione fuga excepturi quas? Assumenda quibusdam autem dolorum sint aut ratione nisi laborum repudiandae perferendis exercitationem pariatur magni veritatis voluptatibus, incidunt fugiat officia, quam architecto dicta recusandae asperiores quaerat! Ullam explicabo totam perspiciatis accusamus quidem nam deleniti beatae dicta repellat? Qui distinctio id, amet dolore officiis inventore, quo consectetur quia, esse vel blanditiis autem cumque tempora ducimus. Repellendus quisquam totam quos impedit obcaecati incidunt laboriosam? Laborum minima eum voluptatibus quos eius ab nam perspiciatis, expedita aut tempora cum, mollitia officia, quasi quam recusandae maiores?",
    userId: "eca7aa61-7567-4d1d-befc-b22e3bc372f6",
    communityId: "1dbd35c9-cc57-4635-afb3-9f8825516bd1",
  },
  {
    postId: "b91ee6e8-2ff9-4684-aa9b-c0e1950934ba",
    title: "post9",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium impedit voluptas exercitationem tenetur in aperiam aliquam ratione fuga excepturi quas? Assumenda quibusdam autem dolorum sint aut ratione nisi laborum repudiandae perferendis exercitationem pariatur magni veritatis voluptatibus, incidunt fugiat officia, quam architecto dicta recusandae asperiores quaerat! Ullam explicabo totam perspiciatis accusamus quidem nam deleniti beatae dicta repellat? Qui distinctio id, amet dolore officiis inventore, quo consectetur quia, esse vel blanditiis autem cumque tempora ducimus. Repellendus quisquam totam quos impedit obcaecati incidunt laboriosam? Laborum minima eum voluptatibus quos eius ab nam perspiciatis, expedita aut tempora cum, mollitia officia, quasi quam recusandae maiores?",
    userId: "eca7aa61-7567-4d1d-befc-b22e3bc372f6",
    communityId: "1dbd35c9-cc57-4635-afb3-9f8825516bd1",
  },
  {
    postId: "e165e1d2-9b67-411b-a8d4-c246cad73321",
    title: "post10",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium impedit voluptas exercitationem tenetur in aperiam aliquam ratione fuga excepturi quas? Assumenda quibusdam autem dolorum sint aut ratione nisi laborum repudiandae perferendis exercitationem pariatur magni veritatis voluptatibus, incidunt fugiat officia, quam architecto dicta recusandae asperiores quaerat! Ullam explicabo totam perspiciatis accusamus quidem nam deleniti beatae dicta repellat? Qui distinctio id, amet dolore officiis inventore, quo consectetur quia, esse vel blanditiis autem cumque tempora ducimus. Repellendus quisquam totam quos impedit obcaecati incidunt laboriosam? Laborum minima eum voluptatibus quos eius ab nam perspiciatis, expedita aut tempora cum, mollitia officia, quasi quam recusandae maiores?",
    userId: "eca7aa61-7567-4d1d-befc-b22e3bc372f6",
    communityId: "1dbd35c9-cc57-4635-afb3-9f8825516bd1",
  },
  {
    postId: "e87cf8ec-72ff-42bc-8c81-b1b4f14313b4",
    title: "post11",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium impedit voluptas exercitationem tenetur in aperiam aliquam ratione fuga excepturi quas? Assumenda quibusdam autem dolorum sint aut ratione nisi laborum repudiandae perferendis exercitationem pariatur magni veritatis voluptatibus, incidunt fugiat officia, quam architecto dicta recusandae asperiores quaerat! Ullam explicabo totam perspiciatis accusamus quidem nam deleniti beatae dicta repellat? Qui distinctio id, amet dolore officiis inventore, quo consectetur quia, esse vel blanditiis autem cumque tempora ducimus. Repellendus quisquam totam quos impedit obcaecati incidunt laboriosam? Laborum minima eum voluptatibus quos eius ab nam perspiciatis, expedita aut tempora cum, mollitia officia, quasi quam recusandae maiores?",
    userId: "eca7aa61-7567-4d1d-befc-b22e3bc372f6",
    communityId: "1dbd35c9-cc57-4635-afb3-9f8825516bd1",
  },
  {
    postId: "b5da84bb-ed20-465e-b73e-be24618a275c",
    title: "post12",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium impedit voluptas exercitationem tenetur in aperiam aliquam ratione fuga excepturi quas? Assumenda quibusdam autem dolorum sint aut ratione nisi laborum repudiandae perferendis exercitationem pariatur magni veritatis voluptatibus, incidunt fugiat officia, quam architecto dicta recusandae asperiores quaerat! Ullam explicabo totam perspiciatis accusamus quidem nam deleniti beatae dicta repellat? Qui distinctio id, amet dolore officiis inventore, quo consectetur quia, esse vel blanditiis autem cumque tempora ducimus. Repellendus quisquam totam quos impedit obcaecati incidunt laboriosam? Laborum minima eum voluptatibus quos eius ab nam perspiciatis, expedita aut tempora cum, mollitia officia, quasi quam recusandae maiores?",
    userId: "eca7aa61-7567-4d1d-befc-b22e3bc372f6",
    communityId: "1dbd35c9-cc57-4635-afb3-9f8825516bd1",
  },
  {
    postId: "17f26e1c-c273-4a37-824b-2221572142d5",
    title: "post13",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium impedit voluptas exercitationem tenetur in aperiam aliquam ratione fuga excepturi quas? Assumenda quibusdam autem dolorum sint aut ratione nisi laborum repudiandae perferendis exercitationem pariatur magni veritatis voluptatibus, incidunt fugiat officia, quam architecto dicta recusandae asperiores quaerat! Ullam explicabo totam perspiciatis accusamus quidem nam deleniti beatae dicta repellat? Qui distinctio id, amet dolore officiis inventore, quo consectetur quia, esse vel blanditiis autem cumque tempora ducimus. Repellendus quisquam totam quos impedit obcaecati incidunt laboriosam? Laborum minima eum voluptatibus quos eius ab nam perspiciatis, expedita aut tempora cum, mollitia officia, quasi quam recusandae maiores?",
    userId: "eca7aa61-7567-4d1d-befc-b22e3bc372f6",
    communityId: "1dbd35c9-cc57-4635-afb3-9f8825516bd1",
  },
  {
    postId: "087924ba-ed20-473c-9a91-22300c25a5ce",
    title: "post14",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium impedit voluptas exercitationem tenetur in aperiam aliquam ratione fuga excepturi quas? Assumenda quibusdam autem dolorum sint aut ratione nisi laborum repudiandae perferendis exercitationem pariatur magni veritatis voluptatibus, incidunt fugiat officia, quam architecto dicta recusandae asperiores quaerat! Ullam explicabo totam perspiciatis accusamus quidem nam deleniti beatae dicta repellat? Qui distinctio id, amet dolore officiis inventore, quo consectetur quia, esse vel blanditiis autem cumque tempora ducimus. Repellendus quisquam totam quos impedit obcaecati incidunt laboriosam? Laborum minima eum voluptatibus quos eius ab nam perspiciatis, expedita aut tempora cum, mollitia officia, quasi quam recusandae maiores?",
    userId: "eca7aa61-7567-4d1d-befc-b22e3bc372f6",
    communityId: "1dbd35c9-cc57-4635-afb3-9f8825516bd1",
  },
  {
    postId: "8a3d8cb6-b90b-40c7-bf74-69bef7229c3a",
    title: "post15",
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
    await db.Post.bulkCreate([
      {
        postId: "8ce67c5c-99d8-46c7-9a90-615cb0ec3617",
        title: "Shopify - How to change background color of a title on collection page by the product tag",
        description: `<p>what I'm trying to do is change the background color of a title area in my collection page thats only including "Bespoke" tag. The following code changes the all of the products background even those products don't have a "Bespoke" tag.</p><p><br></p><pre class="ql-syntax" spellcheck="false">{% for product in collection.products %}
        {% if product.tags contains 'Bespoke' %}
          <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span>
            .title {
              <span class="hljs-attribute">background-color</span>: green <span class="hljs-meta">!important</span>;
            }
          <span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
        {% endif %}
      {% endfor %}
      </pre>`,
        userId: "eca7aa61-7567-4d1d-befc-b22e3bc372f6",
        communityId: "d3c62225-dbbc-4335-b25e-fe06d5edbec1",
      },
      {
        postId: "4044831b-e665-42d0-b5ce-aaa309867b36",
        title: "Unable to get expected output.",
        description: `<p>My input is :</p><pre class="ql-syntax" spellcheck="false"><span class="hljs-keyword">function</span> <span class="hljs-title function_">fruitProcessors</span>(<span class="hljs-params">apples,oranges</span>){
          <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(apples,oranges);
          <span class="hljs-keyword">const</span> juice=<span class="hljs-string">'Juice with \${apples} apples and \${oranges} oranges.'</span>;
          <span class="hljs-keyword">return</span> juice;
      }
      <span class="hljs-keyword">const</span> applejuice=<span class="hljs-title function_">fruitProcessors</span>(<span class="hljs-number">5</span>,<span class="hljs-number">0</span>);
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(applejuice);
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title function_">fruitProcessors</span>(<span class="hljs-number">5</span>,<span class="hljs-number">0</span>));
      </pre><p>My Output:</p><p>Juice with \${apples} apples and \${oranges} oranges.</p><p><br></p><p>Expected Output:</p><p>Juice with 5 apples and 0 oranges.</p><p><br></p><p>Can someone tell me where am I going wrong?</p> CreatePost.tsx:65:12
      
      `,
        userId: "eca7aa61-7567-4d1d-befc-b22e3bc372f6",
        communityId: "d3c62225-dbbc-4335-b25e-fe06d5edbec1",
      },
      {
        postId: "de1daa75-efff-4e9a-bfb3-61191fc50484",
        title: "Python lists - just don't make sense to me!",
        description: `<p>With the below question, I can't for the love of me workout these lists, I just keep defaulting back to 'if' statements. Some of you may recongise this from Codingbat List-1 has23.</p><p><strong>Question:</strong></p><p>Given an int array length 2, return True if it contains a 2 or a 3.</p><p>has23([2, 5]) → Truehas23([4, 3]) → Truehas23([4, 5]) → False</p><p><strong>My answer (OLD):</strong></p><pre class="ql-syntax" spellcheck="false"><span class="hljs-keyword">def</span> <span class="hljs-title function_">has23</span>(<span class="hljs-params">nums</span>):
        <span class="hljs-keyword">if</span> nums[<span class="hljs-number">0</span>] == <span class="hljs-number">2</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-literal">True</span>
        <span class="hljs-keyword">elif</span> nums[<span class="hljs-number">1</span>] == <span class="hljs-number">2</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-literal">True</span>
        <span class="hljs-keyword">elif</span> nums[<span class="hljs-number">0</span>] == <span class="hljs-number">3</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-literal">True</span>
        <span class="hljs-keyword">elif</span> nums[<span class="hljs-number">1</span>] == <span class="hljs-number">3</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-literal">True</span>
        <span class="hljs-keyword">else</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-literal">False</span>
        </pre><p><strong>My answer (NEW):</strong></p><pre class="ql-syntax" spellcheck="false"><span class="hljs-keyword">def</span> <span class="hljs-title function_">has23</span>(<span class="hljs-params">nums</span>):
            <span class="hljs-keyword">return</span> (<span class="hljs-number">2</span> <span class="hljs-keyword">in</span> nums <span class="hljs-keyword">or</span> <span class="hljs-number">3</span> <span class="hljs-keyword">in</span> nums)
        </pre><p>It works but I know there is a simpler way to do this, but for some reason I can't workout how, and its starting to wind me up, there isn't a solution on the page either, as normally I can look at it make sense of the functions and how it operates, but can't with this....</p>`,
        userId: "eca7aa61-7567-4d1d-befc-b22e3bc372f6",
        communityId: "d3c62225-dbbc-4335-b25e-fe06d5edbec1",
      },
      {
        postId: "7d6730a2-67fb-4935-96c6-3bd266e01e7c",
        title: "How to make a vertical carousel slide only when mouse wheel scrolling in Bootstrap 5.3",
        description: `<p>I'm trying to develop a simple website for myself with 0 experience. I managed to make this landing page in 2 full days and I imagined a vertical bootstrap 5 carousel which moves only when I scroll with my mouse's wheel. I figured out that it needs JS, but after 10 hours of searching and trying I could not make it work. Also please do not spare me and be critical about my code if you have time. Thank you for taking the effort!</p><p>Codepen link: <a href="https://codepen.io/user775399/pen/yLxewxj" rel="noopener noreferrer" target="_blank">https://codepen.io/user775399/pen/yLxewxj</a></p><p><br></p><p>I've found different solutions for older versions of Bootstrap and the last one I've tried was on this website:</p><p><a href="https://bootsnipp.com/snippets/Ol55Z" rel="noopener noreferrer" target="_blank">https://bootsnipp.com/snippets/Ol55Z</a></p><p>Honestly it did not do any changes expect that my brain went numb and I changed a lot of lines in my HTML as well and ended up the carousel not working at all. So fortunately I made a save a day before and started it over.</p>`,
        userId: "eca7aa61-7567-4d1d-befc-b22e3bc372f6",
        communityId: "d3c62225-dbbc-4335-b25e-fe06d5edbec1",
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};

export default createPosts;
