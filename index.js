// loading all of the module dependencies
const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://news.ycombinator.com/";

// creating an instance of axios and passing it the Hacker News url as an argument
axios(url)
  .then(response => {
    // we get the html data
    const html = response.data;
    console.log(getNews(html));
  })
  .catch(error => {
    console.log(error);
  });

const getNews = html => {
  // setting an empty array to push the results into
  const data = [];
  // we load the html data into cheerio
  const $ = cheerio.load(html);
  //selecting each span element with the class called comhead and setting
  //that to a variable
  const newsPosts = $("span.comhead");

  // iterating over the objects in the span element
  newsPosts.each(function() {
    // selected the previous element
    const a = $(this).prev();
    // getting the children elements of subtext
    const subtext = a
      .parent()
      .parent()
      .next()
      .children(".subtext")
      .children();

    // obtains the rank by getting the element that is two levels above a
    const rank = a
      .parent()
      .parent()
      .text();

    // gets the title by parsing the link's title
    const title = a.text();
    // gets the uri by getting the href attribute from the link
    const uri = a.attr("href");

    // gets author, points and comments from the children elements
    const author = $(subtext)
      .eq(1)
      .text();
    const points = $(subtext)
      .eq(0)
      .text();
    const comments = $(subtext)
      .eq(5)
      .text();
    // pushes the object into the data array
    data.push({
      title: checkTitle(title),
      uri: checkURI(uri),
      author: checkAuthor(author),
      points: points,
      comments: comments,
      rank: parseInt(rank)
    });
  });
  return data;
  console.log(data);
};

// checks to see if author is a string greater than 0 and less than 256 characters
const checkAuthor = author => {
  if (author.length < 256 && author.length > 0) {
    return author;
  } else {
    return "invalid";
  }
};

// checks to see if title is a string greater than 0 and less than 256 characters
const checkTitle = title => {
  if (title.length < 256 && title.length > 0) {
    return title;
  } else {
    return "invalid";
  }
};
// checks to see if uri is valid using regex
const checkURI = uri => {
  const regexp = /^(([^:/?#]+):)\/\/(([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
  if (regexp.test(uri)) {
    return uri;
  } else {
    return "invalid";
  }
};
// checks to see if comments are valid
const checkPostComments = comments => {
  if (comments === "discuss" || parseInt(comments) <= 0) {
    return 0;
  } else {
    return parseInt(comments);
  }
};
