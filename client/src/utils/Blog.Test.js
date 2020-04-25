import React from "react";

const content = () => (
  <div>
    <div class="blog-content-paragraph">
      As the technology industry is booming globally, the demand for skilled
      programmers has sky rocketed. With a constant demand, and high potential
      incomes, they career choice is becoming a great option for many people
      entering the workforce, as well as those looking to make a career shift
      into an exiting and growing industry.
    </div>
    <div class="blog-content-paragraph">
      Historically, programming has had a high portion of self-taught
      professionals with no formal computer science specific degree's. However
      in recent years, the popularity of computer science degrees have
      increased. Stack Overflow's 2019 Developer survey indicates 60.4% of those
      who completed an undergraduate degree had studied a computer science
      related degree (49.1% of all professional developers surveyed had
      completed a bachelor's degree).
    </div>
    <div class="blog-content-paragraph">
      Nowadays, the pathway to learn how to code generally falls within the
      following categories:
      <ol class="blog-content-paragraph">
        <li>Self Taught</li>
        <li>Bootcampe</li>
        <li>Computer Science Degree</li>
      </ol>
      Pro's and con's of each pathway is outlined below:
    </div>
    <div class="blog-content-paragraph">
      <h2>Self Taught</h2>
      <img
        src="https://i.imgur.com/Yc5q0Cz.jpg"
        alt="img"
        class="blog-content-img-small"
      />
      <h3>Pros</h3>
      <ul>
        <li>
          <b style={{ fontWeight: "bold" }}>Cheaper</b>
        </li>
        <li>
          <b style={{ fontWeight: "bold" }}>Flexible Timing</b>
        </li>
        <li>
          <b style={{ fontWeight: "bold" }}>Up to date curriculum</b>
        </li>
      </ul>
      <h3>Cons</h3>
      <ul>
        <li>
          <b style={{ fontWeight: "bold" }}>Unstructured</b>
        </li>
        <li>
          <b style={{ fontWeight: "bold" }}>Requires dedication:</b> while self
          teaching offers a great deal of flexibility that the other options may
          not, people who choose to go down the path of self teaching to code
          are often working full time in fields that may be unrelated to
          technology. This means life can easily get in the way of dedicating
          the required time to advance your computer science knowledge and skill
          set. Pursueing a bootcamp or University degree generally requires up
          to 20hrs - 40hrs of time per week dedicated to study. For someone
          self-teaching, and working full time, to match the same time
          allocation would be close to impossible
        </li>
      </ul>
    </div>
    <div class="blog-content-paragraph">
      <h2>Bootcamp</h2>
      <img
        src="https://i.imgur.com/Yc5q0Cz.jpg"
        alt="img"
        class="blog-content-img-medium"
      />
      <h3>Pros</h3>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
      <h3>Cons</h3>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
    </div>
    <div class="blog-content-paragraph">
      <h2>Computer Science Degree</h2>
      <img
        src="https://i.imgur.com/Yc5q0Cz.jpg"
        alt="img"
        class="blog-content-img-large"
      />
      <h3>Pros</h3>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
      <h3>Cons</h3>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
    </div>
  </div>
);

const comments = {
  title: "test",
  comment: "test",
  author: "5e85ae64a86fb50b2408c945",
  date: Date.now(),
  likes: 0,
  dislikes: 0,
  _id: 12345,
};

export const testBlog = {
  title: "learn to code - whats the best way?",
  category: "other-shit",
  tags: ["coding", "programming", "technology"],
  author: "5e85ae64a86fb50b2408c945",
  content: content(),
  img: "https://i.imgur.com/Yc5q0Cz.jpg",
  comments,
};
