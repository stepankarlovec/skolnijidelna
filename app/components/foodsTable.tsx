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
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/firebase";
import {createOrder, getUsersOrders} from "@/app/api/order";

export default function FoodsTable(props: {id:number}) {
    const [foods, setFoods] = useState<FoodDay[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState<[]>([]);
    const [user, setUser] = useAuthState(auth);4
    const [fetchedOrders, setfetchedOrders] = useState<[]>([]);


    const saveSelection = () => {
        createOrder(selectedCheckboxes, Number(props.id), user?.uid).then(r => {
            console.log(r);
            alert("Výběr uložen.");
        });
    }

    const handleCheckboxChange = (id:any, food: any) => {
        // @ts-ignore
        setSelectedCheckboxes((prevSelected: any) => {
            const meow = prevSelected.map((el: any) => {
                if (el.food !== food) {
                    return el;
                }
            })
            const meow2 = meow.filter((el: any) => el !== undefined);
            const meow3 = meow2.filter((el: any) => {return el.food !== null});
            const swag = meow3.map((el: any) => {
                if (el.id !== id) {
                    return el;
                }
            })
            const meow4 = swag.filter((el: any) => el !== undefined);
            const final = meow4.filter((el: any) => el.food !== null);
            return [...final, {id: id, food: food}];
        });
        console.log(selectedCheckboxes);
    };

    useEffect(() => {
        setLoading(true);
        getLatestFoodFrom(Number(props.id))
            .then((res) => {
                setFoods(res);
            })
        if(user && user.uid) {
            getUsersOrders(user?.uid, Number(props.id)).then(r => {
                console.log(r);
                // @ts-ignore
                setfetchedOrders(r);
                setLoading(false);
            });
        }else{
            setLoading(false);
        }
    }, []);

    if (!foods) return <div><p>Žádné data</p></div>;

    const renderFetchedOrders = () => {
        return(
            fetchedOrders.map((order:any)=>{
                return(
                    <div key={order?.foodId}>
                        <p>{order?.choice}</p>
                    </div>
                )
            })
        )
    }

    return (
        <>
            {isLoading ? <div><p>Načítání...</p></div> :
            <div>
            {user ?
            <Button variant="outlined" sx={{marginY:"1rem"}} onClick={saveSelection}>Uložit výběr</Button>
            : <div><p style={{marginTop:"1rem", marginBottom:"1rem"}}>Pro výběr obědů se musíte <a href="/auth/login" style={{color:"blue"}}>přihlásit</a>.</p></div>}
            {foods.map((food) => (
                <FoodDuo dayFood={food} key={food.id} selectedCheckboxes={selectedCheckboxes}
                         onCheckboxChange={handleCheckboxChange}></FoodDuo>
            ))}

            <Box component={Paper} sx={{ marginY: "1rem", padding: "1rem" }}>
                <Typography variant="h5">Selected Checkboxes:</Typography>
                <ul>
                    {selectedCheckboxes.map((checkbox:any, index) => (
                        <li key={index}>{checkbox.food}</li>
                    ))}
                </ul>
            </Box>
                <hr></hr>
                <h1 style={{fontSize:"1.5rem"}}>Objednané pokrmy:</h1>
                {renderFetchedOrders()}

            </div>
        }
        </>
    )
}
