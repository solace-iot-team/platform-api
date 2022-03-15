#!/usr/bin/env node

"use strict";

const path = require("path");
const { program } = require("commander");

// const configuration = require(path.resolve(__dirname, '../dist/tools/configuration/index.js'));

// program
//   .name("configuration")
//   .description("Configure an API Management Connector")
//   //.usage("[global options] command")
//   //.helpOption(false);
//   .helpOption("-h, --help", "Display help")
// //.helpOption("-h, --help", "display help");

// program
//   .command("create")
//   .description("Create resources")
//   .requiredOption("-f, --file <path>", "The configuration file (required)")
//   .action((options) => {
//     configuration.create(options.file);
//   });

// program
//   .command("delete")
//   .description("Remove resources")
//   .requiredOption("-f, --file <path>", "The configuration file (required)")
//   .action((options) => {
//     configuration.delete(options.file);
//   });

// program
//   .addHelpCommand(false);

// program.parse(process.argv);

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
