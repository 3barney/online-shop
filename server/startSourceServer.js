/* Web Server to serve files from src directory */

/*eslint-disable no-console*/
import express from 'express';
import webpack from 'webpack';
import path from 'path';
import configuration from '../webpack.config.dev';
import open from 'open';

const port = 3001;
const app = express();
const webpackCompiler = webpack(configuration);

app.use(require('webpack-dev-middleware')(webpackCompiler, {
  noInfo: true,
  publicPath: configuration.output.publicPath
}));

app.use(require('webpack-hot-middleware')(webpackCompiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
