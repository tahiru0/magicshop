import { PrismaClient } from '@prisma/client';
import { products } from '../src/data/products';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seeding...');
  
  // Delete existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.userCart.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();
  
  console.log('Deleted existing data');
  
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.create({
    data: {
      email: 'admin@magicshop.com',
      password: hashedPassword,
      name: 'Admin',
      isAdmin: true
    }
  });
  
  console.log(`Created admin user: ${admin.email}`);
  
  // Create test user
  const testUserPassword = await bcrypt.hash('user123', 10);
  
  const user = await prisma.user.create({
    data: {
      email: 'user@magicshop.com',
      password: testUserPassword,
      name: 'Test User',
      isAdmin: false
    }
  });
  
  console.log(`Created test user: ${user.email}`);
  
  // Create products from our data
  for (const product of products) {
    await prisma.product.create({
      data: {
        name: product.name,
        price: product.numericPrice,
        priceDisplay: product.price,
        description: product.description,
        image: product.image,
        category: product.category,
        inventory: 10,
        featured: ['grimoire-1', 'artifact-1', 'potion-1'].includes(product.id)
      }
    });
  }
  
  console.log(`Created ${products.length} products`);
  
  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
