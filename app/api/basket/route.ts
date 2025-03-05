import { APIError, Product } from "../../../types";
import { devdb } from "../../../lib/db";
import { Low } from "lowdb";
import { NextResponse } from "next/server";

let database: Low<Product[]> | null = null;

async function initDatabase() {
    if (process.env.NODE_ENV === "development") {
        database = devdb();
        await database.read();
    }
}

export async function GET() {
    await initDatabase();

    if (!database || !database.data) {
        return NextResponse.json({ message: "Database not available" }, { status: 502 });
    }

    const occurrences = database.data.reduce((acc, product) => {
        const existingProduct = acc.find(p => p.productId === product.productId);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            acc.push({ ...product, quantity: 1 });
        }
        return acc;
    }, [] as Product[]);
        
    return NextResponse.json(occurrences, { status: 200 });
}

export async function POST(req: Request) {
    await initDatabase();

    if (!database || !database.data) {
        return NextResponse.json({ message: "Database not available" }, { status: 502 });
    }

    try {
        database.data = await req.json();
        await database.write();

        return NextResponse.json(database.data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to save data" } as APIError, { status: 500 });
    }
}