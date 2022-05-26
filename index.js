const { appConfig } = require('./app')
const express = require('express');
const app = express();

appConfig(app);
