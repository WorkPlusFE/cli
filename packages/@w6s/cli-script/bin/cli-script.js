#!/usr/bin/env node

const { checkNodeVersion, logger } = require('@w6s/cli-shared-utils');
const minimist = require('minimist');
const { engines } = require('../package.json');
const { runService } = require('../lib');

checkNodeVersion(engines.node);

const rawArgv = process.argv.slice(2);
const args = minimist(rawArgv, {
  boolean: [
    // build
    'modern',
    'report',
    'report-json',
    'inline-vue',
    'watch',
    // serve
    'open',
    'copy',
    'https',
    // inspect
    'verbose',
  ],
});

const command = args._[0];

runService(command, args, rawArgv).catch((err) => {
  logger.error(err);
  process.exit(1);
});
