const path = require("path");
const fs = require("fs").promises;
const { listContacts } = require("./listContacts");

const contactsPath = path.join(__dirname, "..", "..", "db", "contacts.json");

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

module.exports = {
  removeContact,
};
