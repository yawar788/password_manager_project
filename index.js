const fs = require('fs');
const CryptoJS = require('crypto-js');

// Load existing passwords from JSON file (or create an empty object if it doesn't exist)
const loadPasswords = (path) => {
  if (fs.existsSync(path)) {
    const data = fs.readFileSync(path, 'utf-8');
    return JSON.parse(data);
  }
  return {};
};

// Save passwords to JSON file
const savePasswords = (passwords, path) => {
  fs.writeFileSync(path, JSON.stringify(passwords, null, 2));
};

// Create a new password
const createPassword = (gmail, site, password, masterKey, path) => {
  const passwords = loadPasswords(path);
  const compositeKey = `${gmail}-${site}`;

  if (passwords[compositeKey]) {
    console.log(`An account already exists for ${gmail} at ${site}.`);
  } else {
    const encryptedPassword = CryptoJS.AES.encrypt(password, masterKey).toString();
    passwords[compositeKey] = { site, password: encryptedPassword };

    savePasswords(passwords, path);
    console.log(`Password created successfully for ${gmail} at ${site}.`);
  }
};

// Update an existing password
const updatePassword = (gmail, site, newPassword, masterKey, path) => {
  const passwords = loadPasswords(path);
  const compositeKey = `${gmail}-${site}`;

  if (!passwords[compositeKey]) {
    console.log(`No account found for ${gmail} at ${site}.`);
  } else {
    const encryptedPassword = CryptoJS.AES.encrypt(newPassword, masterKey).toString();
    passwords[compositeKey].password = encryptedPassword;

    savePasswords(passwords, path);
    console.log(`Password updated successfully for ${gmail} at ${site}.`);
  }
};

// Delete a password entry
const deletePassword = (gmail, site, path) => {
  const passwords = loadPasswords(path);
  const compositeKey = `${gmail}-${site}`;

  if (!passwords[compositeKey]) {
    console.log(`No account found for ${gmail} at ${site}.`);
  } else {
    delete passwords[compositeKey];

    savePasswords(passwords, path);
    console.log(`Password deleted for ${gmail} at ${site}.`);
  }
};

// Check if an account exists
const checkStatus = (gmail, site, path) => {
  const passwords = loadPasswords(path);
  const compositeKey = `${gmail}-${site}`;

  if (passwords[compositeKey]) {
    console.log(`An account exists for ${gmail} at ${site}.`);
  } else {
    console.log(`No account found for ${gmail} at ${site}.`);
  }
};

module.exports = { createPassword, updatePassword, deletePassword, checkStatus, loadPasswords, savePasswords };
