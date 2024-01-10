'use strict';

require('dotenv').config();

const amqplib = require('amqplib');

const QUEUE = 'tasks';

const sleep = ms => new Promise((resolve) => setTimeout(resolve, ms));



