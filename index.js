/////////////////////////////////////////////////////////////
const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
//my own module
const replaceTemplate = require('./modules/replace-template');
////////////////////////////////////////////////////////////////////

const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const productData = JSON.parse(data);

const slugs = productData.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
  //   console.log(req.url);
  const { query, pathname } = url.parse(req.url, true);
  // const pathName = req.url;
  //overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'content-type': 'text/html' });
    const cardHtml = productData
      .map((el) => replaceTemplate(tempCard, el))
      .join('');
    const output = tempOverview.replace(/{%productcard%}/g, cardHtml);
    // console.log(cardHtml);
    res.end(output);
  }
  //product page
  else if (pathname === '/product') {
    // console.log(query);
    res.writeHead(200, { 'content-type': 'text/html' });
    const product = productData[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  }
  //api
  else if (pathname === '/api') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(data);
  }
  //not found
  else {
    res.writeHead(404, {
      'content-type': 'text/html',
      'my-own-header': 'sunny-jha',
    });
    res.end('<h1>page not found!!</h1>');
  }
});
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening the server on port 8000');
});
