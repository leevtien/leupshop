import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkAdminUsers() {
  try {
    // Find all admin users
    const adminUsers = await prisma.user.findMany({
      where: { role: 'ADMIN' },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    });
    
    console.log('Total admin users found:', adminUsers.length);
    
    if (adminUsers.length > 0) {
      console.log('Admin users:');
      adminUsers.forEach((user, i) => {
        console.log(`${i+1}. ${user.email} (${user.name || 'No name'}) - Created: ${user.createdAt.toLocaleString()}`);
      });
    } else {
      console.log('No admin users found in the database.');
    }
  } catch (error) {
    console.error('Error checking admin users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAdminUsers();