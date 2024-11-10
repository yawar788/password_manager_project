# Password Manager CLI

This is a Command Line Interface (CLI) tool for managing passwords securely. You can use it to create, update, delete, and check the existence of passwords for various sites. Passwords are saved in a JSON file in an encrypted format using a master key.

## Features

- **Set custom storage path**: Define where the password file should be saved.
- **Create passwords**: Add a new encrypted password for a specific site or service.
- **Update passwords**: Modify an existing password.
- **Delete passwords**: Remove a password entry.
- **Check password status**: Verify if a password entry exists.

## Prerequisites

- **Node.js**: Make sure you have Node.js installed on your system.
- **Git**: Ensure Git is installed if you plan to clone this repository.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yawar788/password_manager_project.git
   cd password_manager_project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Make the CLI executable**:
   Ensure you have the correct permissions:
   ```bash
   chmod +x cli.js
   ```

4. **Run the CLI**:
   ```bash
   node cli.js
   ```

## Usage

To interact with the password manager, you can use the following commands:

### Set the Storage Path
First, set the path where you want to store your password file:
```bash
npx pmcli set-path
```
You’ll be prompted to enter a directory. By default, the current directory is used.

### Commands

- **Create a new password**:
  ```bash
  npx pmcli create
  ```
  - Enter the Gmail, site/service name, password, and master key for encryption.

- **Update an existing password**:
  ```bash
  npx pmcli update
  ```
  - Enter the Gmail, site/service name, new password, and master key.

- **Delete a password**:
  ```bash
  npx pmcli delete
  ```
  - Enter the Gmail and site/service name of the password entry you want to delete.

- **Check password status**:
  ```bash
  npx pmcli status
  ```
  - Enter the Gmail and site/service name to check if an entry exists.

## Example

```bash
npx pmcli set-path
# Prompts to enter path (e.g., "/Users/username/passwords")

npx pmcli create
# Prompts to enter Gmail, site, password, and master key
```

## Configuration

The path to save passwords is stored in a `config.json` file, which is created after you run the `set-path` command.

## File Structure

- **cli.js**: The main file for the CLI tool.
- **index.js**: Contains the core functions for managing passwords.
- **config.json**: Stores the path to the password storage file.

## Security

Passwords are encrypted using AES encryption with a master key. The master key is used only for encrypting and decrypting passwords, and it is not stored.

