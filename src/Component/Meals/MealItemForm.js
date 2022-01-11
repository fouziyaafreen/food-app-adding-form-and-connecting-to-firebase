import Input from "../UI/Input";
import React, {useRef, useState} from 'react';
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
    const [amountValid, setAmountValid]=useState(true);

    const amountInputRef=useRef();
    const onSubmitHandler =(event)=>{
        event.preventDefault();

        const enteredAmount= amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5){
            setAmountValid(false);
            return;
        }
        setAmountValid(true);
        props.onAddToCart(enteredAmountNumber);
    };

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountValid && <p>Please enter valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
