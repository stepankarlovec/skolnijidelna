import FoodRow from "@/app/components/foodRow";
import {Box} from "@mui/system";
import Paper from "@mui/material/Paper";
import {Typography} from "@mui/material";
import * as React from "react";
import {FoodDay, Food} from "@/app/types";

export default function FoodDuo(props: { dayFood: FoodDay}) {
    return (
        <Box component={Paper} sx={{marginY: '1rem', padding: '1rem'}} id={"food-"+String(props.dayFood.id)}>
            <Typography variant="h5" sx={{marginBottom: '0.6rem'}}>{new Date(props.dayFood.date?.seconds * 1000 + props.dayFood.date?.nanoseconds / 1000000).toLocaleDateString("cs-CS")}</Typography>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                {props.dayFood.options.map((food: Food) => (
                    <FoodRow key={food.name} name={food.name} price={food.price} alergens={food.alergens}></FoodRow>
                ))}
            </Box>
        </Box>
    )
}