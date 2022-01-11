import {  useState } from "react";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import CartProvider from "./Components/Store/CartProvider";


const App=(props) =>{
  const [showCart, setshowCart] = useState(false);

  const showCartHandler =()=>{
    setshowCart(true);
  };

  const HideCartHandler =()=>{
    setshowCart(false);
  };

  return (
    <CartProvider>
      {showCart && <Cart onHideCart={HideCartHandler}/>}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
