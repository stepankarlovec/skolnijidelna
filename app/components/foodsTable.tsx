"use client";
import * as React from 'react';
import FoodDuo from "@/app/components/FoodDuo";
import {addFoodDb, getLatestFood} from "@/app/api/food";
import {FoodDay} from "@/app/types";
import {useEffect, useState} from "react";

export default function FoodsTable() {
    const [foods, setFoods] = useState<FoodDay[]>([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getLatestFood()
            .then((res) => {
                setFoods(res);
                setLoading(false);
            })
    }, []);

    if (isLoading) return <p>Načítání...</p>;
    if (!foods) return <p>Žádné data</p>;


    const checkForActive = () => {
        foods.forEach((food) => {
            const inputs = document.getElementById("#food-" + String(food.id))?.getElementsByTagName('input');
            let inputIsActive = false;
            if (inputs) {
                for (let i = 0; i < inputs.length - 1; i++) {
                    if (inputs[i].checked) {
                        inputIsActive = true;
                        for (let i = 0; i < inputs.length - 1; i++) {
                            inputs[i].disabled = true;
                        }
                        inputs[i].disabled = false;
                    }
                }
            }
        });
    };

    return (
        <>
            {foods.map((food) => (
                <FoodDuo dayFood={food} key={food.id}></FoodDuo>
            ))}
        </>
    )
}
