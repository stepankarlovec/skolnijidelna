"use client";

import CreateFoodForm from "@/app/components/admin/createFoodForm";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/firebase";
import * as React from "react";
import {useEffect} from "react";
import {isUserInAdminList} from "@/app/api/user";
import {redirect} from "next/navigation";

export default function Page(){
    const [user, setUser] = useAuthState(auth);
    const [isAdmin, setIsAdmin] = React.useState(false);

    useEffect(() => {
        if (user) {
            isUserInAdminList(user?.email).then(r => {
                setIsAdmin(r);
            })
        }
    }, [user]);

    return (
        <div>
        {!isAdmin ? <div><h1>Nejsi admin</h1></div> :
        <div>
            <CreateFoodForm></CreateFoodForm>
        </div>
        }
        </div>
    )
}