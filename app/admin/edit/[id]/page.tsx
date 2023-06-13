"use client";

import EditFoodForm from "@/app/components/admin/editFoodForm";
import {useEffect, useState} from "react";
import {getSingleFood} from "@/app/api/food";
import {FoodDay} from "@/app/types";
import {usePathname} from "next/navigation";

export default function Page(){
    const [food, setFood] = useState<FoodDay>();
    const [isLoading, setLoading] = useState(false);
    const router = usePathname();


    useEffect(() => {
        setLoading(true);
        getSingleFood(Number(router.split("/").pop()))
            .then((res:any) => {
                setFood(res);
                setLoading(false);
            })
    }, []);

    if(!isLoading){

    }
    return (
        <div>
            {!isLoading && food ?
                <div>
                    <EditFoodForm food={food}></EditFoodForm>
                </div>
                : <div><p>načítání</p></div>
            }
        </div>
    )
}