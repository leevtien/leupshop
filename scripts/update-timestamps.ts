import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateTimestamps() {
  try {
    // Update all users without an updatedAt timestamp
    await prisma.user.updateMany({
      where: {
        updatedAt: null
      },
      data: {
        updatedAt: new Date()
      }
    });
    
    console.log('Successfully updated timestamps for existing users');
  } catch (error) {
    console.error('Error updating timestamps:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateTimestamps();