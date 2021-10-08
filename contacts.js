const url = require("url");
const path = require("path");
const fs = require("fs");

const contactsPath = path.resolve("./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.table(err.message);
    }
    console.table(normalizeData(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.table(err.message);
    }
    const foundContact = normalizeData(data).find(
      ({ id }) => id === Number(contactId)
    );
    console.table(foundContact);
  });
}

function removeContact(contactId) {
  // ...твой код
}

function addContact(name, email, phone) {
  // ...твой код
}

function normalizeData(data) {
  const convertTextData = data.toString();
  return JSON.parse(convertTextData);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
