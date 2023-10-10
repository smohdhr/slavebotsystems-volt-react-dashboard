import path from 'path';
import './addrequire';
import express from 'express';

import { Routes } from './src/routes';
import Render from './src/render';

const HOST = process.env.SERVER_HOST || "0.0.0.0";
const PORT = process.env.SERVER_PORT || 3106;

function reactHandler(req, res) {
  //console.log(`handling request ${req.url}`);
  let content = Render({location: req.url});
  if (content == null) {
    res.status(500).send('Error occured: ' + err);
  } else {
    res.send(content);
  }
}

function dbHandler(req, res) {
  let result = {
    userToken: 'qLXoVBhdYO1nNJjOCI7M4ZZ5zPl73pSCFmLgQKZNDNnTVIGPAw+ZLfDH4yWQTMjofto/GZjeZl+XoJZa6DsdYjuux6Vtq0g3INslSeMXhZZA4Qy00DGugXuSk63/89qs'
  };
  res.send(result);
}

const app = express();

// dirname = C:\msys64\home\Hussain\work\react\volt-react-dashboard
const static_public_path = path.join(__dirname, 'public');
const static_serverbuild_path = path.join(__dirname, 'build');
const static_serverbuild_assets_path = path.join(__dirname, 'build', 'assets');
const static_serverbuild_img_path = path.join(__dirname, 'build', 'assets', 'img');

// midleware
app.use('/public', express.static(static_public_path));
app.use('/assets', express.static(static_serverbuild_assets_path));
app.use('/img', express.static(static_serverbuild_img_path));
app.use('/build', express.static(static_serverbuild_path));

Object.values(Routes).forEach((value) => {
  app.get(value.path, reactHandler);
});

app.get('/db/*', dbHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on ${HOST} at port ${PORT}`);
});
