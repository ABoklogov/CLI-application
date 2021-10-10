const path = require("path");
const fs = require("fs").promises;
const shortid = require("shortid");
require("colors");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  const contacts = normalizeData(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const foundContact = contacts.find(({ id }) => id === Number(contactId));
  return foundContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === Number(contactId));
  if (idx === -1) {
    return null;
  }

  contacts.splice(idx, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return true;
}

async function addContact(name, email, phone) {
  const newContact = {
    id: shortid.generate(),
    name,
    email,
    phone,
  };
  const contacts = await listContacts();

  const checkingContacts = (el) => el.name.toLowerCase() === name.toLowerCase();
  if (contacts.some(checkingContacts)) {
    return null;
  }

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return true;
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
