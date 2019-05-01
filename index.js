// loading all of the module dependencies
const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://news.ycombinator.com/";

// creating an instance of axios and passing it the Hacker News url as an argument
axios(url).then(response => {
  // we get the html data
  const html = response.data;
  // we load the html data into cheerio
  const $ = cheerio.load(html);

  //selecting each span element with the class called comhead and setting
  //that to a variable

  const newsPosts = $("span.comhead");

  // setting an empty array to push the results into
  const data = [];

  // iterating over the objects in the span element
  newsPosts.each(function() {
    // selected the previous element
    const a = $(this).prev();
  });
});
