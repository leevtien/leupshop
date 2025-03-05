import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sampleProducts = [
  {
    name: 'VPN Premium',
    description: 'Secure VPN service for anonymous browsing and unrestricted access to global content.',
    price: 9.99,
    imageUrl: '/images/vpn-premium.jpg',
    category: 'VPN',
    stock: 100
  },
  {
    name: 'VPN Basic',
    description: 'Basic VPN service with essential protection and reasonable speed.',
    price: 4.99,
    imageUrl: '/images/vpn-basic.jpg',
    category: 'VPN',
    stock: 100
  },
  {
    name: 'AI Writing Assistant',
    description: 'AI-powered tool to help you write better content, correct grammar, and suggest improvements.',
    price: 14.99,
    imageUrl: '/images/ai-writing.jpg',
    category: 'AI Tools',
    stock: 50
  },
  {
    name: 'AI Image Generator',
    description: 'Generate stunning images from text descriptions using advanced AI technology.',
    price: 19.99,
    imageUrl: '/images/ai-image.jpg',
    category: 'AI Tools',
    stock: 30
  },
  {
    name: 'Cloud Storage 1TB',
    description: 'Secure cloud storage with 1TB capacity, file sharing, and automatic backup.',
    price: 8.99,
    imageUrl: '/images/cloud-storage.jpg',
    category: 'Cloud Services',
    stock: 200
  }
];

async function seedProducts() {
  try {
    console.log('Starting to seed products...');
    
    for (const product of sampleProducts) {
      const existingProduct = await prisma.product.findFirst({
        where: {
          name: product.name
        }
      });
      
      if (!existingProduct) {
        await prisma.product.create({
          data: product
        });
        console.log(`Created product: ${product.name}`);
      } else {
        console.log(`Product "${product.name}" already exists`);
      }
    }
    
    console.log('Products seeding completed!');
  } catch (error) {
    console.error('Error seeding products:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedProducts();