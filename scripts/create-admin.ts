import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

// Minimal validation function
const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

async function createAdminUser() {
  // Get credentials from command line arguments
  const email = process.argv[2];
  const password = process.argv[3];
  const name = process.argv[4] || 'Admin';

  if (!email || !password) {
    console.error('Usage: npx ts-node scripts/create-admin.ts <email> <password> [name]');
    process.exit(1);
  }

  if (!isValidEmail(email)) {
    console.error('Please provide a valid email address');
    process.exit(1);
  }

  if (password.length < 8) {
    console.error('Password must be at least 8 characters long');
    process.exit(1);
  }

  // Initialize Prisma client
  const prisma = new PrismaClient();

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      if (existingUser.role === 'ADMIN') {
        console.log(`User ${email} already exists as an admin`);
        
        // Ask if user wants to update password
        const readline = require('readline').createInterface({
          input: process.stdin,
          output: process.stdout
        });

        readline.question('Do you want to update the password? (y/n) ', async (answer: string) => {
          if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
            const hashedPassword = await bcrypt.hash(password, 10);
            await prisma.user.update({
              where: { email },
              data: { password: hashedPassword }
            });
            console.log('Password updated successfully');
          }
          readline.close();
          await prisma.$disconnect();
        });
        return;
      } else {
        // Promote to admin
        await prisma.user.update({
          where: { id: existingUser.id },
          data: { role: 'ADMIN' }
        });
        console.log(`User ${email} has been promoted to admin`);
        await prisma.$disconnect();
        return;
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const user = await prisma.user.create({
      data: {
        id: randomUUID(),
        email,
        name,
        password: hashedPassword,
        role: 'ADMIN',
        balance: 0
      },
    });

    console.log(`Admin user created successfully: ${user.email}`);
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();