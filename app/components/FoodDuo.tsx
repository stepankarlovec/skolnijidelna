import FoodRow from "@/app/components/foodRow";
import {Box} from "@mui/system";
import Paper from "@mui/material/Paper";
import {Typography} from "@mui/material";
import * as React from "react";
import {FoodDay, Food} from "@/app/types";
import {useState} from "react";

export default function FoodDuo(props: { dayFood: FoodDay }) {

    const [selectedFood, setSelectedFood] = useState<string | null>(null);

    const handleCheckboxChange = (name: string) => {
        // Handle checkbox change here
        setSelectedFood(prevSelectedFood => (prevSelectedFood === name ? null : name));
        console.log(selectedFood);
        // You can store the checkbox state in the component's state or perform any other logic
    };
    return (
        <Box component={Paper} sx={{marginY: '1rem', padding: '1rem'}} id={"food-" + String(props.dayFood.id)}>
            <Typography variant="h5"
                        sx={{marginBottom: '0.6rem'}}>{new Date(props.dayFood.date?.seconds * 1000 + props.dayFood.date?.nanoseconds / 1000000).toLocaleDateString("cs-CS")}</Typography>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                {props.dayFood.options.map((food: Food, index) => (
                    <FoodRow key={index} index={index} name={food.name} price={food.price} alergens={food.alergens}
                             isChecked={selectedFood === food.name}
                             onCheckboxChange={handleCheckboxChange}></FoodRow>
                ))}
            </Box>
        </Box>
    )
}