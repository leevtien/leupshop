import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { PrismaClient } from '@prisma/client';

// Create a new Prisma client instance
const prisma = new PrismaClient();

export async function GET() {
  try {
    // For development, we'll temporarily skip authorization check
    
    // Get all products
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: `An error occurred while fetching products: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  } finally {
    // Disconnect Prisma client in finally block to ensure it always happens
    await prisma.$disconnect();
  }
}