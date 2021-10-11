const path = require("path");
const fs = require("fs").promises;
const { normalizeData } = require("./normalizeData");

const contactsPath = path.join(__dirname, "..", "..", "db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  const contacts = normalizeData(data);
  return contacts;
}

module.exports = {
  listContacts,
};
