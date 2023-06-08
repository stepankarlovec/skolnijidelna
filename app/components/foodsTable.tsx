"use client";
import * as React from 'react';
import {useEffect, useState} from 'react';
import FoodDuo from "@/app/components/FoodDuo";
import {getLatestFood} from "@/app/api/food";
import {FoodDay} from "@/app/types";
import Button from "@mui/material/Button";

export default function FoodsTable() {
    const [foods, setFoods] = useState<FoodDay[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [selectedCheckboxes,setSelectedCheckboxes] = useState<string[]>([]); // Ref to store the IDs of selected checkboxes


    useEffect(() => {
        setLoading(true);
        getLatestFood()
            .then((res) => {
                setFoods(res);
                setLoading(false);
            })
    }, []);

    const handleFoodSelectionChange = (selectedFoodIds: string) => {
        setSelectedCheckboxes([selectedFoodIds,...selectedCheckboxes]); // Update the selected checkboxes IDs
    };

    const handleSaveSelection = () => {
        // Perform the necessary actions with the selected IDs (e.g., store them in the database)
         // Get the IDs of selected checkboxes
        console.log("Selected Food IDs:", selectedCheckboxes);
    };

    if (isLoading) return <p>Načítání...</p>;
    if (!foods) return <p>Žádné data</p>;


    return (
        <>
            <Button variant="outlined" sx={{marginY:"1rem"}} onClick={handleSaveSelection}>Uložit výběr</Button>
            {foods.map((food) => (
                <FoodDuo dayFood={food} key={food.id} onFoodSelectionChange={handleFoodSelectionChange}></FoodDuo>
            ))}
        </>
    )
}
