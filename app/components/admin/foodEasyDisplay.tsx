"use client";
import * as React from 'react';
import FoodDuo from "@/app/components/FoodDuo";
import {addFoodDb, getLatestFood} from "@/app/api/food";
import {FoodDay} from "@/app/types";
import {useEffect, useState} from "react";
import Button from '@mui/material/Button';
import {Box} from "@mui/system";
import {Divider} from "@mui/material";
import Link from "@mui/material/Link";

export default function FoodEasyDisplay () {
    const [foods, setFoods] = useState<FoodDay[]>([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getLatestFood()
            .then((res) => {
                setFoods(res);
                setLoading(false);
                console.log(foods);
            })
    }, []);

    if (isLoading) return <div><p>Načítání...</p></div>;
    if (!foods) return <div><p>Žádné data</p></div>;

    return (
        <>
            <div>
                <a href="/admin/add"><Button variant="outlined">Přidat</Button></a>
            {foods.map((food) => (
                <Box key={food.id}>
                    <Box sx={{width:"100%", display:"flex", justifyContent:"space-between", padding:"8px"}}>
                        <h2>{new Date(food.date?.seconds * 1000 + food.date?.nanoseconds / 1000000).toLocaleDateString("cs-CS")}</h2>
                        <a href={"/admin/edit/"+food.id} style={{color:"red"}}>Upravit</a>
                    </Box>
                    <Box sx={{display:"flex", flexDirection:"column"}}>
                        <Box sx={{display:"flex",flexDirection:"column",marginBottom:"1rem"}}>
                        {food.options.map((option:any)=> (
                            <p style={{opacity: "80%"}}>- {option.name}</p>
                        ))}
                        </Box>
                        <Divider></Divider>
                    </Box>
                </Box>
            ))}
            </div>
        </>

    )
}
