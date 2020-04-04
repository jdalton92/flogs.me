const app = require("./app");

app.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
