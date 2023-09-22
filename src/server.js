import path from 'path';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
//import fs from 'fs';
//import dns from 'dns';

import Main from './main.js';

const HOST = process.env.SERVER_HOST || "0.0.0.0";
const PORT = process.env.SERVER_PORT || 3106;

function reactHandler(req, res) {
  //console.log(`handling request ${req.url}`);
  let content = ReactDOMServer.renderToString(
    <Main location={req.url} />
  );
  if (content == null) {
    res.status(500).send('Error occured: ' + err);
  } else {
    content = '<!DOCTYPE html>' + content.replace(/%PUBLIC_URL%/g, '/public');
    res.send(content);
  }
}

const app = express();

const static_public_path = path.join(__dirname, '..', 'public');
const static_serverbuild_path = path.join(__dirname, '..', 'server-build');
const static_serverbuild_assets_path = path.join(__dirname, '..', 'server-build', 'assets');

// midleware
app.use('/public', express.static(static_public_path));
app.use('/assets', express.static(static_serverbuild_assets_path));
app.use('/server-build', express.static(static_serverbuild_path));

app.get('*', reactHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on ${HOST} at port ${PORT}`);
});
