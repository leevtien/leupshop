import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import bcrypt from "bcryptjs";

// WARNING: This is for development only - remove in production!
export async function GET(req: Request) {
  try {
    // Add a secure token check to prevent unauthorized access
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');
    
    // Use a secure token
    if (token !== 'your-secure-token-here') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    
    const email = searchParams.get('email') || 'admin@example.com';
    const password = searchParams.get('password') || 'AdminPassword123';
    const name = searchParams.get('name') || 'Administrator';
    
    // Check if admin already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // Update existing user to admin
      await prisma.user.update({
        where: { id: existingUser.id },
        data: { role: 'ADMIN' }
      });
      
      return NextResponse.json({ 
        message: `User ${email} updated to ADMIN role`,
        userId: existingUser.id
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'ADMIN', // Set role to ADMIN
        balance: 0
      },
    });

    return NextResponse.json({ 
      message: `Admin user ${email} created successfully`,
      userId: newUser.id
    });
    
  } catch (error) {
    console.error("Admin creation error:", error);
    return NextResponse.json({ error: "Error creating admin user" }, { status: 500 });
  }
}