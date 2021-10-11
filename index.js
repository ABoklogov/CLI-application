const { Command } = require("commander");
const contactsFunc = require("./controllers/contacts");
require("colors");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      await contactsFunc
        .listContacts()
        .then((contacts) => console.table(contacts))
        .catch((error) => console.log(`${error.message}`.red));
      break;

    case "get":
      await contactsFunc
        .getContactById(id)
        .then((data) => {
          data
            ? console.table(data)
            : console.log(`контакт с id = ${id} не найден`.red);
        })
        .catch((error) => console.log(`${error.message}`.red));
      break;

    case "add":
      await contactsFunc
        .addContact(name, email, phone)
        .then((data) =>
          data
            ? console.log(`контакт успешно добавлен`.green)
            : console.log(`контакт с именем ${name} уже есть`.red)
        )
        .catch((error) => console.log(`${error.message}`.red));
      break;

    case "remove":
      await contactsFunc
        .removeContact(id)
        .then((data) =>
          data
            ? console.log(`контакт c id = ${id} успешно удален`.green)
            : console.log(`контакт c id = ${id} не найден`.red)
        )
        .catch((error) => console.log(`${error.message}`.red));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
