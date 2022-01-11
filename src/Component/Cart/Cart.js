import Modal from "../UI/Modal";
import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import CartContext from "../Store/CartContext";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const ctx = useContext(CartContext);
  const [checkout, setCheckout] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const CartItemremoveHandler = (id) => {
    ctx.removeItem(id);
  };
  const CartAddItemHandler = (item) => {
    ctx.addItem(item);
  };
  const checkoutHandler = () => {
    setCheckout(true);
  };
  const onConfirmHandler = (userdata) => {
    setSubmitting(true);
    fetch("https://https-food-app-default-rtdb.firebaseio.com/userOrder.json", {
      method: "POST",
      body: JSON.stringify({
        user: userdata,
        orderedItems: ctx.items,
      }),
    });
    setSubmitting(false);
    setDidSubmit(true);
    ctx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={CartItemremoveHandler.bind(null, item.id)}
          onAdd={CartAddItemHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItem = ctx.items.length > 0;

  const cartModalContent = (
    <React.Fragment>
      <div>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        {checkout && (
          <Checkout
            onConfirm={onConfirmHandler}
            onCancel={props.onHideCart}
            className={classes["cart-items"]}
          />
        )}
        {!checkout && (
          <div className={classes.actions}>
            <button
              className={classes["button--alt"]}
              onClick={props.onHideCart}
            >
              Close
            </button>
            {hasItem && (
              <button className={classes.button} onClick={checkoutHandler}>
                Order
              </button>
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
  const isSubmittingContent= <React.Fragment><p> Cart is Submitting...</p></React.Fragment>

  const didSubmitContent = <React.Fragment><p> Cart is Submitted</p><div className={classes.actions}>
  <button
    className={classes["button"]}
    onClick={props.onHideCart}
  >
    Close
  </button></div></React.Fragment>
  return <Modal onclick={props.onHideCart}>
    {!isSubmitting &&!didSubmit && cartModalContent}
    {isSubmitting && isSubmittingContent}
    {didSubmit && didSubmitContent}
  </Modal>;
};

export default Cart;
