'use client';

import React, { HTMLAttributes } from "react";
import { useGetBasketQuery, useRemoveFromBasketMutation } from "../store/services/basket";
import { useState } from "react";
import Image from "next/image";
import styles from "../styles/Basket.module.css";
import { RiShoppingCartLine } from "react-icons/ri";


const Basket: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { data = [] } = useGetBasketQuery();
  const [removeFromBasket] = useRemoveFromBasketMutation();
  const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
      setIsOpen(!isOpen);
    };

  const handleRemoveFromBasket = (productId: string) => {
    removeFromBasket(productId);
  };

  return (
    <div {...props}>
      <div className={styles.Basket}>
        <p className={styles.BasketBadge}>{data.length}</p>
        <button className={styles.BasketButton} onClick={toggleDrawer}>
          <RiShoppingCartLine fontSize={20} color="#9e2121" />
        </button>
      </div>

      {isOpen && (
        <div className={isOpen ? `${styles.BasketDrawer} ${styles.open}` : `${styles.BasketDrawer}`}>
          <div className="flex justify-between items-center mx-2">
            <h3>Basket</h3>
            <button onClick={() => setIsOpen(false)}>X</button>
          </div>
          <div className={styles.BasketSummary}>
            <p>
              Total items: {data.length}
            </p>
          </div>
          <ul className={styles.BasketList}>
            {data.map((product) => (
              <li className={styles.BasketItem} key={product.productId}>
                <Image src="/Brown Paper Bag.png" alt={product.productName} width={50} height={50} />
                <span>{product.productName}</span>
                <button onClick={() => handleRemoveFromBasket(product.productId)}>
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
