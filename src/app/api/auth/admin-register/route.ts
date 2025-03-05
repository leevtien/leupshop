import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import bcrypt from "bcryptjs";

// This should be a strong secret key stored in .env
const ADMIN_REGISTRATION_SECRET = process.env.ADMIN_REGISTRATION_SECRET || "your-super-secret-key-not-in-code";

export async function POST(req: Request) {
  try {
    const { email, password, secret, name } = await req.json();

    // Validate the secret key
    if (secret !== ADMIN_REGISTRATION_SECRET) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const newUser = await prisma.user.create({
      data: { 
        email, 
        password: hashedPassword,
        name: name || email.split("@")[0],
        role: "ADMIN",
      },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(
      { message: "Admin registered successfully", user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An error occurred during registration" },
      { status: 500 }
    );
  }
}