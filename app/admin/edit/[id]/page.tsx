"use client";

import EditFoodForm from "@/app/components/admin/editFoodForm";
import {useEffect, useState} from "react";
import {getSingleFood} from "@/app/api/food";
import {FoodDay} from "@/app/types";
import {redirect, usePathname} from "next/navigation";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/firebase";
import * as React from "react";
import {isUserInAdminList} from "@/app/api/user";

export default function Page(){
    const [food, setFood] = useState<FoodDay>();
    const [isLoading, setLoading] = useState(false);
    const router = usePathname();

    const [user, setUser] = useAuthState(auth);
    const [isAdmin, setIsAdmin] = React.useState(false);


    useEffect(() => {
        if (user) {
            isUserInAdminList(user?.email).then(r => {
                setIsAdmin(r);
            })
        }

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
            {!isAdmin ? <div><h1>Nejsi admin</h1></div> :
                <div>
            {!isLoading && food ?
                <div>
                    <EditFoodForm food={food}></EditFoodForm>
                </div>
                : <div><p>načítání</p></div>
            }
                </div>
            }
</div>
    )
}