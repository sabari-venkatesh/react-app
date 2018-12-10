import express from "express";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import App from './app';

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.resolve(__dirname, "../dist")));

app.get("/*", (req, res) => {
  const jsx = (<App />);
  const reactDom = renderToString(jsx);

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(htmlTemplate(reactDom));
});

app.listen(port);

function htmlTemplate(reactDom) {
  return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <title>Document</title>
        <base href="/" />
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
        </style>
      </head>
      
      <body>
          <div id="app">${reactDom}</div>
          <script src="./app.bundle.js"></script>
      </body>
      </html>
  `;
}