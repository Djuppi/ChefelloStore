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

export async function DELETE(req: Request) {
  await initDatabase();
  const currentState = database?.data;
  if (!database || !database.data) {
    return NextResponse.json(
      { message: "Database not available" },
      { status: 502 }
    );
  }

  try {
    const productToRemove = await req.json();
    const updatedState = currentState?.filter(
      (product) => product.productId !== productToRemove.productId
    );
    if (!updatedState) {
      return NextResponse.json({ message: "Product not found" } as APIError, {
        status: 404,
      });
    }
    database.data = updatedState;
    await database.write();

    return NextResponse.json(database.data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to save data" } as APIError, {
      status: 500,
    });
  }
}
