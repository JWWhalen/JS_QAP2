const fs = require('fs'); // File system
const http = require('http'); // HTTP server
const EventEmitter = require('events'); // Event emitter

class MyEmitter extends EventEmitter {} // creats an instance of the MyEmitter class
const myEmitter = new MyEmitter();

// a function to serve the HTML files
function serveHtmlFile(fileName, response) {
    const filePath = `./views/${fileName}`;
    fs.readFile(filePath, (err, data) => {
        if (err) {
            response.writeHead(500, { 'Content-Type': 'text/html' });
            response.end('<h1>Error loading the page</h1>');
            const errorMsg = `Error serving ${fileName}: ${err.message}`;
            console.error(errorMsg);
            myEmitter.emit('error', errorMsg);
        } else {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(data);
            console.log(`${fileName} served`);
            myEmitter.emit('fileRead', fileName);
        }
    });
}
// a function to serve the CSS files
function serveCssFile(fileName, response) {
    const filePath = `./css/${fileName}`;
    fs.readFile(filePath, (err, data) => {
        if (err) {
            response.writeHead(404, { 'Content-Type': 'text/css' });
            response.end("/* CSS file not found */");
        } else {
            response.writeHead(200, { 'Content-Type': 'text/css' });
            response.end(data);
        }
    });
}

// a function to log to a file
const logToFile = (msg) => {
    const logMessage = `${new Date().toISOString()} - ${msg}\n`;
    fs.appendFile('server.log', logMessage, (err) => {
        if (err) console.error('Logging to file failed', err);
    });
};

// sets up event listeners
myEmitter.on('fileRead', (fileName) => {
    const logMsg = `File read successfully: ${fileName}`;
    logToFile(logMsg);
    console.log(`File read successfully: ${fileName}`);
});

myEmitter.on('error', (msg) => {
    console.error(`Error: ${msg}`);
    logToFile(`Error: ${msg}`); // log to file
    console.error(`Error: ${msg}`);
});

const server = http.createServer((request, response) => {
    const url = request.url; // gets the requested URL

    // switch statement for different routes
    switch (url) {
        case '/':
            serveHtmlFile('index.html', response);
            break;
        case '/about':
            serveHtmlFile('about.html', response);
            break;
        case '/contact':
            serveHtmlFile('contact.html', response);
            break;
        case '/products':
            serveHtmlFile('products.html', response);
            break;
        case '/subscribe':
            serveHtmlFile('subscribe.html', response);
            break;
        case '/css/styles.css':
            serveCssFile('styles.css', response);
            break;
        case '/favicon.ico':
            response.writeHead(204); // No Content
            response.end();
            break;
        default:
            response.writeHead(404, { 'Content-Type': 'text/html' });
            response.end('<h1>404 Not Found</h1>');
            myEmitter.emit('error', 'Page not found: ' + url); // Now logging the specific URL that was not found
    }
});


// starts the server
const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
