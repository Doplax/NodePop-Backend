import dotenv from "dotenv";
import connectDB from "../shared/config/mongo";
import Product from "../models/Product.model";
import { productsList } from "../seed/data/products.data";

// Cargar variables de entorno
dotenv.config();

/**
 * Script para cargar solo productos en la base de datos
 */
const seedProducts = async () => {
  try {
    console.log("🔄 Connecting to database...");
    await connectDB();

    console.log("\n🗑️  Cleaning existing products...");
    await Product.deleteMany({});
    console.log("✅ Existing products cleaned");

    console.log("\n📦 Loading products...");
    const createdProducts = await Product.insertMany(productsList);
    console.log(`✅ ${createdProducts.length} products loaded successfully`);

    console.log("\n📋 Products created:");
    createdProducts.forEach((product) => {
      console.log(
        `   - ${product.name} - $${product.price} (${product.isForSale ? "For Sale" : "Not for sale"})`,
      );
    });

    console.log("\n✨ Products seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error seeding products:", error);
    process.exit(1);
  }
};

// Ejecutar el seed
seedProducts();
