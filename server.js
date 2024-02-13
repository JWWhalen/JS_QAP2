const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url; // Gets the requested URL

  // Switch statement fir different routes
switch (url) {
    case "/":
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Home Page</h1>");
        console.log("Home page visited");
        break;
    case "/about":
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>About Us</h1>");
        console.log("About page visited");
        break;
    case "/contact":
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Contact Us</h1>");
        console.log("Contact page visited");
        break;
    case "/products":
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Our Products</h1>");
        console.log("Products page visited");
        break;
    case "/subscribe":
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Subscribe</h1>");
        console.log("Subscribe page visited");
        break;
    default:
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 Not Found</h1>");
        console.log("Page not found");
}
});
// starts the server
const port = 3000;
server.listen(port, () => {
console.log(`Server running at http://localhost:${port}/`);
});
