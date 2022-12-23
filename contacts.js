const fs = require("fs").promises;
const path = require("path");
// const {nanoid} = require("nanoid");

const constactsPath = path.join(__dirname, "db", "contacts.json");

const readContacts = async (filePath) => await fs.readFile(filePath);
const updateContacts = async (data) =>
  await fs.writeFile(constactsPath, JSON.stringify(data, null, 2));

async function listContacts() {
  const data = await fs.readFile(constactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const bookId = String(contactId);
  const contacts = await listContacts();
  const contactById = contacts.find((item) => item.id === bookId);
  return contactById || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const bookId = String(contactId);
  const index = contacts.findIndex((item) => item.id === bookId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { /* id: nanoid(), */ name, email, phone };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
