"use client";

import {TextField} from "@mui/material";
import {Box} from "@mui/system";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {getLastCreatedDocument, updateFoodDb} from "@/app/api/food";
import getAllPlaces from "@/app/api/places";
import {FoodDay} from "@/app/types";

interface Meal {
    id: number;
    name: string;
    price: number;
    alergens: string;
}

export default function EditFoodForm(props: {food:FoodDay}){
    const prepareFoodToMealConvert = (food:FoodDay) => {
        const convertedFood = food.options.map((option)=>{
            return { id: option.id, name: option.name, price: option.price, alergens: option.alergens.join(',')}
        })
        return convertedFood;
    }

    const preparePreviousDate = (food:FoodDay) => {
        let curDate = new Date(food.date.toDate());
        const year = curDate.getFullYear().toString();
        const month = (curDate.getMonth()+1).toString().padStart(2,'0');
        const day = curDate.getDate().toString().padStart(2,'0');
        return year + "-" + month + "-" + day;
    }
    const [meals, setMeals] = useState<Meal[]>(prepareFoodToMealConvert(props.food));
    const [date, setDate] = useState<any>(preparePreviousDate(props.food));
    const [places, setPlaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPlace, setSelectedPlace] = useState(props.food.placeId.toString());


    useEffect(() => {
        setIsLoading(true);
        getAllPlaces()
            .then((res:any) => {
                setPlaces(res);
                setIsLoading(false);
            })
    }, []);

    const editCurrentMeal = () => {

        let lastItem = 0;
        getLastCreatedDocument("food").then((data)=>{
            lastItem = data.id;
        });

        const prepareMeals = meals.map((meal)=>{
            return { id: meal.id, name: meal.name, price: meal.price, alergens: meal.alergens.split(',')}
        })

        const swag = updateFoodDb({
            id: lastItem+1,
            placeId: Number(selectedPlace),
            date: preparePreviousDate(props.food) === date ? new Date(date) : date,
            options: prepareMeals
        });

        swag.then((res) => {
            alert("Úspěšně upraveno");
        });
    }

    const handleChangeMeal = (index: number, field: string, value: string | number) => {
        setMeals((prevMeals) =>
            prevMeals.map((meal, i) => {
                if (i === index) {
                    return { ...meal, [field]: value };
                }
                return meal;
            })
        );
    };

    const handleAddMeal = () => {
        setMeals((prevMeals) => [...prevMeals, { id: prevMeals.length, name: '', price: 0, alergens: '' }]);
    };

    return (
        <div>
            <Box sx={{display:"flex", flexDirection:"column"}}>
                <input type="date" defaultValue={date} onChange={(e) => setDate(new Date(e.target.value))} style={{ width: '300px' }} />
                <select  value={selectedPlace}
                         onChange={(event) => setSelectedPlace(event.target.value)} style={{ width: '300px', border: '1px solid black' }}>
                    {places.map((place:any)=>(
                        <option key={place.id} value={place?.id}>{place?.name}</option>
                    ))}
                </select>
                <a href="#" style={{ display:"flex", justifyContent:"center", width: '50px', color:"red", fontSize:"2rem", border: "1px solid red", padding:"0.1rem" }} onClick={handleAddMeal}>
                    +
                </a>
            </Box>
            <div style={{ display: 'flex', gap: '1rem' }}>
                {meals.map((meal, index) => (
                    <div
                        key={meal.id}
                        style={{ maxWidth: '250px', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid black', padding: '8px' }}
                    >
                        <p>{meal.id}</p>
                        <TextField
                            id={`name-${meal.id}`}
                            value={meal.name}
                            onChange={(e) => handleChangeMeal(index, 'name', e.target.value)}
                            label="Název pokrmu"
                            variant="outlined"
                        />
                        <TextField
                            id={`price-${meal.id}`}
                            type="number"
                            value={meal.price}
                            onChange={(e) => handleChangeMeal(index, 'price', parseInt(e.target.value, 10))}
                            label="Cena"
                            variant="outlined"
                        />
                        <TextField
                            id={`allergens-${meal.id}`}
                            value={meal.alergens}
                            onChange={(e) => handleChangeMeal(index, 'alergens', e.target.value)}
                            label="Alergeny (oddělte čárkou)"
                            variant="outlined"
                        />
                    </div>
                ))}
            </div>
            <Button sx={{marginTop:"1rem"}} variant="outlined" onClick={editCurrentMeal}>Upravit</Button>
        </div>
    );
}