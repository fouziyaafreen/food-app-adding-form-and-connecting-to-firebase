import { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem";
import Card from "../UI/Card";

const AvailableMeals = () => {
  const [meals, setmeals] = useState([]);
  const [loading, setloading] = useState(true);
  const [httpsError,setHttpsError]=useState();
  useEffect(() => {
    const fetchmeals = async () => {
      const response = await fetch(
        "https://https-food-app-default-rtdb.firebaseio.com/meals.json"
      );

      if(!response.ok){
        throw new Error("Something went wrong");
      }
      const responsedata = await response.json();
      const loadedmeals = [];
      for (const key in responsedata) {
        loadedmeals.push({
          id: key,
          name: responsedata[key].name,
          description: responsedata[key].description,
          price: responsedata[key].price,
        });
      }
      setmeals(loadedmeals);
      setloading(false);
    };
    fetchmeals().catch((error)=>{
      setloading(false);
      setHttpsError(error.message);
    })
   
  }, []);

  if (loading) {
    return (
      <section>
        <p className={classes.mealsloading}>Loading...</p>
      </section>
    );
  }
  if(httpsError){
    return (
      <section>
        <p className={classes.mealerror}>{httpsError}</p>
      </section>
    )
  }

  const mealsList = meals.map((element) => (
    <MealItem
      // key={element.id}
      id={element.id}
      name={element.name}
      description={element.description}
      price={element.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <section className={classes.meals}>
        <Card>
          <ul>{mealsList}</ul>
        </Card>
      </section>
    </section>
  );
};

export default AvailableMeals;
