#!/usr/bin/env node

// loading all of the module dependencies
const axios = require("axios");
const cheerio = require("cheerio");
const program = require("commander");

const url = "https://news.ycombinator.com";

const getHackerNewsHTML = page => {
  // creating an instance of axios and passing it the Hacker News url as an argument
  axios(url)
    .then(response => {
      // we get the html data
      const html = response.data;
      console.log(getNewsPosts(html));
    })
    .catch(error => {
      console.log(error);
    });
};

const getNewsPosts = html => {
  // setting an empty array to push the results into
  const data = [];
  // we load the html data into cheerio
  const $ = cheerio.load(html);
  //selecting each span element with the class called comhead and setting
  //that to a variable
  const newsPosts = $("span.comhead");

  // iterating over the objects in the span element
  newsPosts.each(function(i, el) {
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
      title: checkPostTitle(title),
      uri: checkURI(uri),
      author: checkPostAuthor(author),
      points: checkPostPoints(points),
      comments: checkPostComments(comments),
      rank: parseInt(rank)
    });
  });
  return data;
  console.log(data);
};

// commander function

program
  .option("-p, --posts [value]", "Number of Posts")
    .action(args =>
      getHackerNewsHTML(args.posts)
      .then(html => getNewsPosts(html, args.posts))
    )
program.parse(process.argv)

// checks to see if author is a string greater than 0 and less than 256 characters
const checkPostAuthor = author => {
  if (author.length < 256 && author.length > 0) {
    return author;
  } else {
    return "invalid";
  }
};

// checks to see if title is a string greater than 0 and less than 256 characters
const checkPostTitle = title => {
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
  if (parseInt(comments) <= 0 || comments === "" || comments === "discuss") {
    return 0;
  } else {
    return parseInt(comments);
  }
};

// checks to see if points are valid
const checkPostPoints = points => {
  if (parseInt(points) <= 0) {
    return 0;
  } else {
    return parseInt(points);
  }
};
