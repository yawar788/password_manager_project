#!/usr/bin/env node
const yargs = require('yargs');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const {
  createPassword,
  updatePassword,
  deletePassword,
  checkStatus,
} = require('./index.js');

const configFilePath = path.join(__dirname, 'config.json');

// Function to ask for password details based on the chosen command
const askForPasswordDetails = async (command) => {
  const questions = [
    {
      name: 'gmail',
      message: 'Enter your Gmail:',
      type: 'input',
    },
    {
      name: 'site',
      message: 'Enter the site or service name:',
      type: 'input',
    },
  ];

  if (['create', 'update'].includes(command)) {
    questions.push({
      name: 'password',
      message: 'Enter the password:',
      type: 'password',
      mask: '*',
    });
  }

  if (['create', 'update'].includes(command)) {
    questions.push({
      name: 'masterKey',
      message: 'Enter your master key:',
      type: 'password',
      mask: '*',
    });
  }

  return inquirer.prompt(questions);
};

// Function to load the saved path from the config file
const loadConfig = () => {
  if (fs.existsSync(configFilePath)) {
    const config = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'));
    return config.baseDirectory;
  }
  return null;
};

// Function to save the path to the config file
const saveConfig = (directory) => {
  const config = { baseDirectory: directory };
  fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
};

// Check if the provided path exists
const checkPathExists = (directory) => {
  return fs.existsSync(directory);
};

// Ask for the path where the password file should be saved
const askForPath = async () => {
  const { directory } = await inquirer.prompt({
    name: 'directory',
    message: 'Enter the path where you want to save your password file:',
    type: 'input',
    default: process.cwd(), // Default to the current directory
  });

  if (checkPathExists(directory)) {
    saveConfig(directory + '/passwords.json'); // Set to the file name
    console.log(`Path set to: ${directory}/passwords.json`);
  } else {
    console.log(`The specified path "${directory}" does not exist. Please create the directory first.`);
    process.exit(1); // Exit the process if the path doesn't exist
  }
};

// Main CLI command handler with yargs
yargs
  .command(
    'set-path',
    'Set the path where the password file will be saved',
    {},
    async () => {
      await askForPath(); // Ask for the path
    }
  )
  .command(
    'create',
    'Create a new password',
    {},
    async () => {
      const baseDirectory = loadConfig();
      if (!baseDirectory) {
        console.log('Please set the path first using "pmcli set-path".');
        process.exit(1);
      }
      const { gmail, site, password, masterKey } = await askForPasswordDetails('create');
      createPassword(gmail, site, password, masterKey, baseDirectory);
    }
  )
  .command(
    'update',
    'Update an existing password',
    {},
    async () => {
      const baseDirectory = loadConfig();
      if (!baseDirectory) {
        console.log('Please set the path first using "pmcli set-path".');
        process.exit(1);
      }
      const { gmail, site, password, masterKey } = await askForPasswordDetails('update');
      updatePassword(gmail, site, password, masterKey, baseDirectory);
    }
  )
  .command(
    'delete',
    'Delete an existing password',
    {},
    async () => {
      const baseDirectory = loadConfig();
      if (!baseDirectory) {
        console.log('Please set the path first using "pmcli set-path".');
        process.exit(1);
      }
      const { gmail, site } = await askForPasswordDetails('delete');
      deletePassword(gmail, site, baseDirectory);
    }
  )
  .command(
    'status',
    'Check if a password exists',
    {},
    async () => {
      const baseDirectory = loadConfig();
      if (!baseDirectory) {
        console.log('Please set the path first using "pmcli set-path".');
        process.exit(1);
      }
      const { gmail, site } = await askForPasswordDetails('status');
      checkStatus(gmail, site, baseDirectory);
    }
  )
  .help()
  .alias('help', 'h')
  .argv;
