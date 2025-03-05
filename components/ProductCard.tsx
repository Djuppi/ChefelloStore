import React, { HTMLAttributes } from "react";

import { Product } from "../types";
import styles from "../styles/ProductCard.module.css";
import Image from "next/image";
import { useAddToBasketMutation } from "../store/services/basket";

interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [updateProduct] = useAddToBasketMutation();

    const handleAddToCart = () => {
      updateProduct(product);
    }
  
  const foregroundColor: string = "#" + product.productImage.split("/").pop();

  return (
    <div className={styles.ProductCard}>
      <div className={styles.CardContent}>
        <Image
          className={styles.ProductImage}
          src={`/Brown Paper Bag.png`}
          alt={`Paper bag`}
          width={100}
          height={20}
        />
        <p style={{ color: foregroundColor }}><small>{product.stock} in stock</small></p>
        <Image
          className={styles.BackgroundImage}
          src={`${product.productImage}.png&text=+`}
          alt={product.productName}
          width={200}
          height={250}
        />
        <h3 className={styles.ProductName} style={{ color: foregroundColor }}>
          {product.productName}
        </h3>
        <button onClick={handleAddToCart} className={styles.AddToBasketButton}>Add to basket</button>
      </div>
    </div>
  );
};

export default ProductCard;
