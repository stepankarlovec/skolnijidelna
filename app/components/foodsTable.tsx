"use client";
import * as React from 'react';
import FoodDuo from "@/app/components/FoodDuo";
import {addFoodDb, getLatestFood, getLatestFoodFrom} from "@/app/api/food";
import {FoodDay} from "@/app/types";
import {useEffect, useState} from "react";
import {Box} from "@mui/system";
import Paper from "@mui/material/Paper";
import {Typography} from "@mui/material";
import Button from "@mui/material/Button";

export default function FoodsTable(props: {id:number}) {
    const [foods, setFoods] = useState<FoodDay[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);

    const handleCheckboxChange = (name: string) => {
        setSelectedCheckboxes((prevSelectedCheckboxes) => {
            if (prevSelectedCheckboxes.includes(name)) {
                // Remove the checkbox from the selected checkboxes
                return prevSelectedCheckboxes.filter((checkbox) => checkbox !== name);
            } else {
                // Add the checkbox to the selected checkboxes
                return [...prevSelectedCheckboxes, name];
            }
        });
    };

    useEffect(() => {
        setLoading(true);
        getLatestFoodFrom(Number(props.id))
            .then((res) => {
                setFoods(res);
                setLoading(false);
            })
    }, []);

    if (isLoading) return <p>Načítání...</p>;
    if (!foods) return <p>Žádné data</p>;


    return (
        <>
            <Button variant="outlined">Uložit výběr</Button>
            {foods.map((food) => (
                <FoodDuo dayFood={food} key={food.id} selectedCheckboxes={selectedCheckboxes}
                         onCheckboxChange={handleCheckboxChange}></FoodDuo>
            ))}
            {/*
            <Box component={Paper} sx={{ marginY: "1rem", padding: "1rem" }}>
                <Typography variant="h5">Selected Checkboxes:</Typography>
                <ul>
                    {selectedCheckboxes.map((checkbox) => (
                        <li key={checkbox}>{checkbox}</li>
                    ))}
                </ul>
            </Box>
            */}
        </>
    )
}
