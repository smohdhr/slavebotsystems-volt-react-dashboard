import path from 'path';
import './addrequire';
import express from 'express';

import { Routes } from './src/routes';
import Render from './src/render';

const HOST = process.env.SERVER_HOST || '0.0.0.0';
const PORT = process.env.SERVER_PORT || 3000;
const BASE_PATH = '/webmachine';

function reactHandler(req, res) {
  //console.log(`handling request ${req.url}`);
  let content = Render({
    basename: BASE_PATH,
    location: req.url
  });
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
const router = express.Router();

// dirname = C:\msys64\home\Hussain\work\react\volt-react-dashboard
const static_public_path = path.join(__dirname, 'public');
const static_serverbuild_path = path.join(__dirname, 'build');
const static_serverbuild_assets_path = path.join(__dirname, 'build', 'assets');
const static_serverbuild_img_path = path.join(__dirname, 'build', 'assets', 'img');

// midleware
router.use('/public', express.static(static_public_path));
router.use('/assets', express.static(static_serverbuild_assets_path));
router.use('/img', express.static(static_serverbuild_img_path));
router.use('/build', express.static(static_serverbuild_path));

Object.values(Routes).forEach((value) => {
  router.get(value.path, reactHandler);
});

router.get('/db/*', dbHandler);

app.use(BASE_PATH, router);

app.listen(PORT, () => {
  console.log(`Server is listening on ${HOST} at port ${PORT}`);
});
