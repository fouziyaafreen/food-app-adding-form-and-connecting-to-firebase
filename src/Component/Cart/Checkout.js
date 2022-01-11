import classes from "./Checkout.module.css";
import { useRef,useState } from "react";

const Checkout = (props) => {
    const [formIsValid,setFormIsValid]=useState({
        name:true,
        street:true,
        postalCode:true,
        city:true
    });

    const isEmpty =(value)=>value.trim()==='';
    const isFiveChar=(value)=>value.trim().length===5;

    const nameInputRef=useRef();
    const streetInputRef=useRef();
    const postalCodeInputRef=useRef();
    const cityInputRef=useRef();

  const onconfirmHandler = (event) => {
    event.preventDefault();

    const enteredName=nameInputRef.current.value;
    const enteredStreet=streetInputRef.current.value;
    const enteredPostalCode=postalCodeInputRef.current.value;
    const enteredCity=cityInputRef.current.value;

    const ValidName=!isEmpty(enteredName);
    const ValidStreet=!isEmpty(enteredStreet);
    const ValidPostalCode=isFiveChar(enteredPostalCode);
    const ValidCity=!isEmpty(enteredCity);

        setFormIsValid({
            name:ValidName,
            postalCode:ValidPostalCode,
            street:ValidStreet,
            city:ValidCity
        })
   
   
    const formvalid=ValidName&&ValidStreet&&ValidPostalCode&&ValidCity;

    if(!formvalid){
        return;
    }
    console.log("inside formconfirm")
    props.onConfirm({
        name:enteredName,
        stree:enteredStreet,
        postalCode:enteredPostalCode,
        city:enteredCity
    })
  };

  return (
    <form onSubmit={onconfirmHandler} className={classes['form']}>
      <div className={`${classes.control} ${formIsValid.name ?'':classes.invalid}`}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef}/>
        {!formIsValid.name && <p className={classes['error-text']}>Please enter name.</p>}
      </div>
      <div className={`${classes.control} ${formIsValid.street ?'':classes.invalid}`}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef}/>
        {!formIsValid.street && <p className={classes['error-text']}>Please enter street name.</p>}
      </div>
      <div className={`${classes.control} ${formIsValid.postalCode ?'':classes.invalid}`}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formIsValid.postalCode && <p className={classes['error-text']}>Please 5 digit Postal Code.</p>}
      </div>
      <div className={`${classes.control} ${formIsValid.city ?'':classes.invalid}`}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef}/>
        {!formIsValid.city && <p className={classes['error-text']}>Please enter City name.</p>}
      </div>
      <div className={classes.actions}>
        
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
