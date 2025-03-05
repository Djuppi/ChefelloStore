"use client";

import React, { HTMLAttributes, useMemo, useState } from "react";
import { useGetProductsQuery } from "../store/services/products";

import ProductCard from "./ProductCard";
import styles from "../styles/ProductList.module.css";

const PRODUCTS_PER_PAGE = 8;

const ProductList: React.FC<HTMLAttributes<HTMLUListElement>> = (props) => {
  const [page, setPage] = useState<number>(1);
  const { data: products } = useGetProductsQuery({
    page,
    limit: PRODUCTS_PER_PAGE,
  });
  const { data: allProducts } = useGetProductsQuery({ page: 1, limit: undefined });

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const nOfPages = useMemo(() => {
    if(!allProducts?.data.length) return 0;
    return Math.ceil(allProducts?.data?.length / PRODUCTS_PER_PAGE) + 1;
  }, [allProducts]);

  return (
    <div className={styles.ProductListContainer}>
      <h1>Products</h1>
      <ul {...props} className={styles.ProductList}>
        {products?.data.map((product) => (
          <li key={product.productId}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
      <div className={styles.Pagination}>
        <button
          disabled={page === 1}
          className={styles.LoadMoreButton}
          onClick={handlePreviousPage}
        >
          Previous
        </button>
        {Array.from(
          { length: nOfPages || 0 },
          (_, i) =>
            i > 0 && (
              <div
                onClick={() => setPage(i)}
                key={i}
                className={i === page ? styles.ActivePage : styles.PageNumber}
              >
                <p>{i}</p>
              </div>
            )
        )}
        <button
          disabled={page === nOfPages - 1}
          className={styles.LoadMoreButton}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
