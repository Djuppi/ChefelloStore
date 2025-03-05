import React from "react";
import {
  useRemoveFromBasketMutation,
  useAddToBasketMutation,
} from "../store/services/basket";
import { Product } from "../types";

type Props = {
  product: Product;
};

const IncrementButtons = ({ product }: Props) => {
  const [removeFromBasket] = useRemoveFromBasketMutation();
  const [updateProduct] = useAddToBasketMutation();

  const handleRemoveOneFromBasket = (productId: string) => {
    removeFromBasket({ id: productId, removeAll: false });
  };

  const handleAddToCart = (product: Product) => {
    updateProduct(product);
  };
  
  return (
    <div className="flex justify-between w-50">
      <button onClick={() => handleRemoveOneFromBasket(product.productId)}>
        -
      </button>
      <span>{product.quantity}</span>
      <button onClick={() => handleAddToCart(product)}>+</button>
    </div>
  );
};

export default IncrementButtons;
