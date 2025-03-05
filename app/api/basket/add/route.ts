import { Low } from "lowdb/lib";
import { NextResponse } from "next/server";
import { devdb } from "../../../../lib/db";
import { Product, APIError } from "../../../../types";

let database: Low<Product[]> | null = null;

async function initDatabase() {
  if (process.env.NODE_ENV === "development") {
    database = devdb();
    await database.read();
  }
}

export async function POST(req: Request) {
  await initDatabase();
  const currentState = database?.data;
  if (!database || !database.data) {
    return NextResponse.json(
      { message: "Database not available" },
      { status: 502 }
    );
  }

  try {
    const newProduct: Product = await req.json();
    if (currentState) {
      database.data = [...currentState, newProduct];
    } else {
      database.data = [newProduct];
    }
    await database.write();

    return NextResponse.json(database.data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to save data" } as APIError, {
      status: 500,
    });
  }
}
