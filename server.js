const http = require("http");
// creates a server
const server = http.createServer((request, response) => {
const url = request.url; // Gets the requested URL

  // Switch statement fir different routes
switch (url) {
    case "/":
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end("<h1>Home Page</h1>");
        console.log("Home page visited");
        break;
    case "/about":
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end("<h1>About Us</h1>");
        console.log("About page visited");
        break;
    case "/contact":
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end("<h1>Contact Us</h1>");
        console.log("Contact page visited");
        break;
    case "/products":
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end("<h1>Our Products</h1>");
        console.log("Products page visited");
        break;
    case "/subscribe":
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end("<h1>Subscribe</h1>");
        console.log("Subscribe page visited");
        break;
    default:
        response.writeHead(404, { "Content-Type": "text/html" });
        response.end("<h1>404 Not Found</h1>");
        console.log("Page not found");
}
});
// starts the server
const port = 3000;
server.listen(port, () => {
console.log(`Server running at http://localhost:${port}/`);
});
