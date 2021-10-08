const path = require("path");
const fs = require("fs");
const shortid = require("shortid");
require("colors");

const contactsPath = path.resolve("./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      `${err.message}`.red;
    }
    const contacts = normalizeData(data);
    console.table(contacts);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.log(`${err.message}`.red);
    }
    const foundContact = normalizeData(data).find(
      ({ id }) => id === Number(contactId)
    );

    if (!foundContact) {
      console.log(`контакт с id = ${contactId} не найден`.red);
      return;
    }
    console.table(foundContact);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    const newContacts = normalizeData(data).filter(
      ({ id }) => id !== Number(contactId)
    );

    fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2), (err) => {
      if (err) {
        console.log("ошибка удаления контакта".red);
        return;
      }
      console.log(`контакт c id = ${contactId} успешно удален.`.green);
    });
  });
}

function addContact(name, email, phone) {
  const newContact = {
    id: shortid.generate(),
    name: name,
    email: email,
    phone: phone,
  };

  fs.readFile(contactsPath, (err, data) => {
    const contacts = normalizeData(data);
    contacts.push(newContact);

    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
      if (err) {
        console.log("ошибка добавления контакта".red);
        return;
      }
      console.log(`контакт успешно добавлен`.green);
      console.table(contacts);
    });
  });
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
