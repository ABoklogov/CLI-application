const { listContacts } = require("./listContacts");

async function getContactById(contactId) {
  const contacts = await listContacts();
  const foundContact = contacts.find(({ id }) => id === Number(contactId));
  return foundContact;
}
module.exports = {
  getContactById,
};
