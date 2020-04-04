export const blog = {
  _id: 1,
  title: "blog 1",
  category: "topic",
  tags: ["money", "finance", "flogs"],
  date: new Intl.DateTimeFormat("en-US").format(new Date()),
  author: "author",
  content: "content",
  image: "imageURL", //Store URL
  comments: [
    {
      _id: 12345,
      date: new Intl.DateTimeFormat("en-US").format(new Date()),
      title: "comment2.1",
      author: "author2.1",
      comment: "comment detail2.1",
      likes: 5,
      dislikes: 2
    }
  ]
};

export const blogs = [
  {
    _id: 1,
    title: "blog 1",
    category: "category",
    tags: ["money", "finance", "flogs"],
    date: new Intl.DateTimeFormat("en-US").format(new Date()),
    author: "author",
    content: "content",
    image: "imageURL", //Store URL
    comments: [
      {
        _id: 12345,
        date: new Intl.DateTimeFormat("en-US").format(new Date()),
        title: "comment2.1",
        author: "author2.1",
        comment: "comment detail2.1",
        likes: 5,
        dislikes: 2
      }
    ]
  },
  {
    _id: 2,
    title: "blog 2",
    category: "category",
    tags: ["money", "finance", "flogs"],
    date: new Intl.DateTimeFormat("en-US").format(new Date()),
    author: "author2",
    content: "content",
    image: "imageURL", //Store URL
    comments: [
      {
        _id: 1,
        date: new Intl.DateTimeFormat("en-US").format(new Date()),
        title: "comment",
        author: "author",
        comment: "comment detail",
        likes: 2,
        dislikes: 2
      },
      {
        _id: 2,
        date: new Intl.DateTimeFormat("en-US").format(new Date()),
        title: "comment2.2",
        author: "author2.2",
        comment: "comment detail2.2",
        likes: 2,
        dislikes: 2
      }
    ]
  }
];
