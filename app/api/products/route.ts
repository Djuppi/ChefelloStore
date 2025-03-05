import { APIError, Product } from "../../../types";
import products from "../../../data/products.json";
import { NextResponse } from "next/server";

const PRODUCTS_PER_PAGE = 12;
export function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const limitParam = url.searchParams.get("limit");
        const pageParam = url.searchParams.get("page") || 1;
        const limit = limitParam ? +limitParam : undefined;
        const productList: Product[] = products;
        if (limit) {
            return NextResponse.json({ data: productList.slice(((+pageParam-1)*+limit), ((+pageParam-1)*+limit)+limit) }, { status: 200 });
        } 
        return NextResponse.json({ data: productList }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch data" } as APIError, {
            status: 500,
        });
    }
}