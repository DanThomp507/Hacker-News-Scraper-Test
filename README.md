## Hacker News Web Scraper Test

## Installation Instructions
* git clone https://github.com/DanThomp507/Hacker-News-Scraper-Test.git
* cd into project directory
* run `npm run install-hacker`

## How to Run

* After installation, all you have to do is type `hackernews
--posts [page number]` or `hackernews -p [page number]`
* Running these commands will return the requested page number in the console
* Each page contains 30 posts
* You can also run `hackernews --help` for automated help

## Libraries Used and Why
- Axios: a Javascript library that is used to make HTTP requests from Node.js.
I used Axios because it parses JSON responses and supports promises by default.
It is also easy-to-use and improves efficiency.
- Cheerio: an implementation of a subset of JQuery designed for the server.
I used Cheerio because it allowed me to work with downloaded data as opposed to
parsing through it. It improves efficiency and is easy-to-use.
- Commander.js, a command line library for Node.js. I used Commander.js
to run the program from the command line. Its clean syntax and
auto-generated help are particularly beneficial.
