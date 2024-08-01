import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../contexts/StoreContext'
import FoodItem from '../FoodItem/FoodItem';

type FoodDisplayProps = {
  category: string;
};


const FoodDisplay:React.FC<FoodDisplayProps> = ({category}) => {

  const context = useContext(StoreContext);
  if(!context){
    throw new Error('FoodDisplay must be used within a StoreContextProvider');
  }

  const {food_list} = context

  return (
    <div className="food-display" id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item:any, index:any) => {
          if(category==="All" || category===item.category) {
            return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
          }
        })}
      </div>
    </div>
  )
}

export default FoodDisplay