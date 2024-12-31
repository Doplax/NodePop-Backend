"use strict";

const products = require("./products.js");
require("dotenv").config();
const readline = require("node:readline");
const dbConnect = require("../config/mongo.js");
const { Product, User } = require("../models/index.js");
const { encrypt } = require("../utils/handlePassword.js");

async function main() {
  try {
    // Wait for database connection
    await dbConnect();

    const confirm = await ask(
      "Are you sure you want to delete the database and load initial data? (yes/no): "
    );
    if (!confirm) {
      process.exit();
    }

    await initUsers();
    await initProducts();
    console.log("Database initialization complete.");
  } catch (error) {
    console.error("There was an error", error);
  } finally {
    process.exit();
  }
}

async function initProducts() {
  const deletedProducts = await Product.deleteMany();
  console.log(`Deleted ${deletedProducts.deletedCount} products.`);

  const insertedProducts = await Product.insertMany(products);
  console.log(`Inserted ${insertedProducts.length} products.`);
}

async function initUsers() {
  const deletedUsers = await User.deleteMany();
  console.log(`Deleted ${deletedUsers.deletedCount} users.`);

  let users = [
    { email: "admin@example.com", password: "1234" },
    { email: "user@example.com", password: "1234" },
    { email: "pedro@gmail.com", password: "pedro" },
  ];

  users = await Promise.all(users.map(async user => {
    const encryptedPassword = await encrypt(user.password);
    return { ...user, password: encryptedPassword };
  }));

  const insertedUsers = await User.insertMany(users);
  console.log(`Inserted ${insertedUsers.length} users.`);
}

function ask(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === "yes");
    });
  });
}

main();
