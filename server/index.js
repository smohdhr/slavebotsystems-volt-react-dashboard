//import path from 'path';
//import fs from 'fs';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Routes } from '../src/routes.js';
import express from 'express';
//import dns from 'dns';

import Main from '../src/main.js';

const HOST = process.env.SERVER_HOST || "0.0.0.0";
const PORT = process.env.SERVER_PORT || 3106;

function reactHandler(req, res) {
  let content = ReactDOMServer.renderToString(
    <Main location={req.url} />
  );
  if (content == null) {
    res.status(500).send('Error occured: ' + err);
  } else {
    content = '<!DOCTYPE html>' + content.replace(/%PUBLIC_URL%/g, './');
    res.send(content);
  }
}

function createReactRouting(app) {
  for (const [key, value] of Object.entries(Routes)) {
    let path = value.path;
    app.get(path, reactHandler);
  }
}

const app = express();

createReactRouting(app);

// midleware
app.use(express.static('public'));
app.use(express.static('server-build'));

app.listen(PORT, () => {
  console.log(`Server is listening on ${HOST} at port ${PORT}`);
});
