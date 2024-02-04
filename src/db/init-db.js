"use strict";

require("dotenv").config();
const readline = require("node:readline");
const dbConnect = require("../config/mongo.js");
const { Product, User } = require("../models/index.js");

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

  const products = [
    {
      name: "Laptop Pro",
      price: 1200,
      isForSale: true,
      photo: "laptop_pro.jpg",
      tags: ["Laptop"],
    },
    {
      name: "Smartphone Lite",
      price: 299,
      isForSale: true,
      photo: "smartphone_lite.jpg",
      tags: ["Smartphone"],
    },
  ];
  const insertedProducts = await Product.insertMany(products);
  console.log(`Inserted ${insertedProducts.length} products.`);
}

async function initUsers() {
  const deletedUsers = await User.deleteMany();
  console.log(`Deleted ${deletedUsers.deletedCount} users.`);

  const users = [
    { email: "admin@example.com", password: "1234" }, // Consider hashing the password
    { email: "user@example.com", password: "1234" }, // Consider hashing the password
  ];
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
