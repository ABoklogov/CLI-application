const path = require("path");
const fs = require("fs").promises;
const { listContacts } = require("./listContacts");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "..", "..", "db", "contacts.json");

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

module.exports = {
  addContact,
};
