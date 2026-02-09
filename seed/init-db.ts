import dotenv from "dotenv";
import connectDB from "../src/shared/config/mongo";
import Product from "../src/models/Product.model";
import User from "../src/models/User.model";
import { productsList } from "./data/products.data";
import { usersList } from "./data/users.data";
import { encrypt } from "../src/shared/utils/handlePassword";

// Cargar variables de entorno
dotenv.config();

/**
 * Script para inicializar la base de datos
 * Sobrescribe completamente los datos existentes
 */
const initDB = async () => {
  try {
    console.log("🔄 Connecting to database...");
    await connectDB();

    console.log("\n🗑️  Cleaning existing data...");
    await Promise.all([User.deleteMany({}), Product.deleteMany({})]);
    console.log("✅ Existing data cleaned");

    // Cargar Usuarios
    console.log("\n👥 Loading users...");
    const hashedUsers = await Promise.all(
      usersList.map(async (user) => ({
        email: user.email,
        password: await encrypt(user.password), // Hashear password
      })),
    );

    const createdUsers = await User.insertMany(hashedUsers);
    console.log(`✅ ${createdUsers.length} users loaded successfully`);

    console.log("\n📋 Users created:");
    createdUsers.forEach((user) => {
      const originalPassword = usersList.find(
        (u) => u.email === user.email,
      )?.password;
      console.log(`   - ${user.email} (password: ${originalPassword})`);
    });

    // Cargar Productos
    console.log("\n📦 Loading products...");
    const createdProducts = await Product.insertMany(productsList);
    console.log(`✅ ${createdProducts.length} products loaded successfully`);

    console.log("\n📋 Products created:");
    createdProducts.forEach((product) => {
      console.log(
        `   - ${product.name} - $${product.price} (${product.isForSale ? "For Sale" : "Not for sale"})`,
      );
    });

    console.log("\n✨ Database initialized successfully!");
    console.log("\n🔑 Login credentials:");
    console.log("   Admin: admin@example.com / 1234");
    console.log("   User: user@example.com / 1234");

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error initializing database:", error);
    process.exit(1);
  }
};

// Ejecutar la inicialización
initDB();
