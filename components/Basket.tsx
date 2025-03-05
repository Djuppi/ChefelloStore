"use client";

import React, { HTMLAttributes } from "react";
import {
  useAddToBasketMutation,
  useGetBasketQuery,
  useRemoveFromBasketMutation,
} from "../store/services/basket";
import { useState } from "react";
import Image from "next/image";
import styles from "../styles/Basket.module.css";
import { RiShoppingCartLine } from "react-icons/ri";
import { Product } from "../types";
import IncrementButtons from "./IncrementButtons";

const Basket: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { data = [] } = useGetBasketQuery();
  const [removeFromBasket] = useRemoveFromBasketMutation();
  const [updateProduct] = useAddToBasketMutation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleRemoveFromBasket = (productId: string) => {
    removeFromBasket({id: productId, removeAll: true});
  };

  const handleRemoveOneFromBasket = (productId: string) => {
    removeFromBasket({id: productId, removeAll: false});
  };

  const handleAddToCart = (product: Product) => {
    updateProduct(product);
  }

  const numberOfItems = data.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div {...props}>
      <div className={styles.Basket}>
        <p className={styles.BasketBadge}>{numberOfItems}</p>
        <button className={styles.BasketButton} onClick={toggleDrawer}>
          <RiShoppingCartLine fontSize={20} color="#9e2121" />
        </button>
      </div>

      {isOpen && (
        <div
          className={
            isOpen
              ? `${styles.BasketDrawer} ${styles.open}`
              : `${styles.BasketDrawer}`
          }
        >
          <div className="flex justify-between items-center mx-2">
            <h3>Basket</h3>
            <button onClick={() => setIsOpen(false)}>X</button>
          </div>
          <div className={styles.BasketSummary}>
            <p>Total items: {numberOfItems}</p>
          </div>
          <ul className={styles.BasketList}>
            {data.map((product) => (
              <li className={styles.BasketItem} key={product.productId}>
                <Image
                  src="/Brown Paper Bag.png"
                  alt={product.productName}
                  width={50}
                  height={50}
                />
                <div className="flex flex-col gap-1">
                  <span>{product.productName}</span>
                  <IncrementButtons product={product} />
                </div>
                <button
                  onClick={() => handleRemoveFromBasket(product.productId)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Basket;
