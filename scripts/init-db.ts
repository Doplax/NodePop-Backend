"use strict";

import products from "../src/db/productsList";
import dotenv from "dotenv";
dotenv.config();
import readline from "node:readline";
import dbConnect from "../src/config/mongo";
import Product from "../src/models/Product";
import User from "../src/models/User";
import { encrypt } from "../src/utils/handlePassword";

async function main(): Promise<void> {
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

async function initProducts(): Promise<void> {
  const deletedProducts = await Product.deleteMany();
  console.log(`Deleted ${deletedProducts.deletedCount} products.`);

  const insertedProducts = await Product.insertMany(products);
  console.log(`Inserted ${insertedProducts.length} products.`);
}

async function initUsers(): Promise<void> {
  const deletedUsers = await User.deleteMany();
  console.log(`Deleted ${deletedUsers.deletedCount} users.`);

  interface UserData {
    email: string;
    password: string;
  }

  let users: UserData[] = [
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

function ask(question: string): Promise<boolean> {
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