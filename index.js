const contacts = require("./contacts.js");

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const list = await contacts.listContacts();
      console.log(list);
      break;

    case "get":
      const contact = await contacts.getContactById(id);
      console.log(contact);
      break;

    case "add":
      const newContacts = await contacts.addContact(name, email, phone);
      console.log(newContacts);
      break;
      
    case "remove":
      const deleteContact = await contacts.removeContact(id);
      console.log(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "10" });
// invokeAction({ action: "add", name: 'Mark Sopelniak', email: 'sop@gmail.com', phone: '1234512345' });
// invokeAction({ action: "remove", id: "9" });
invokeAction(argv);
