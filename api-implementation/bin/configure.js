#!/usr/bin/env node

"use strict";

const path = require("path");
const { program } = require("commander");

program
  .name("configure")
  .description("Configure an API Management Connector")
  .helpOption("-h, --help", "Display usage information")
  .requiredOption("-f, --file <file>", "The configuration file (required)")
  .option("-d, --drop", "Remove the organization from the configuration file");

program.parse(process.argv);

const configuration = require(path.resolve(__dirname, '../dist/tools/configuration/index.js'));
if (configuration) {

  const options = program.opts();
  if (options.drop) {
    configuration.teardown(options.file);
  } else {
    configuration.setup(options.file);
  }
}
