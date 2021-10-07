const url = require("url");
const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.resolve("./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => normalizeData(data))
    .catch((err) => err.message);
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const foundContact = normalizeData(data).find(
        ({ id }) => id === contactId
      );
      return foundContact;
    })
    .catch((err) => err.message);
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
// getContactById(2);
// console.log(listContacts());

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
