"use client";

import * as React from 'react';
import UserDisplay from "@/app/components/admin/userDisplay";
import OverallStats from "@/app/components/admin/overallStats";
import Paper from "@mui/material/Paper";
import {Box} from "@mui/system";
import FoodEasyDisplay from "@/app/components/admin/foodEasyDisplay";
import {isUserInAdminList} from "@/app/api/user";
import {useEffect} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/firebase";
import {redirect} from "next/navigation";

export default function AdminPanel() {
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
            {isAdmin ?
                <Box sx={{display: "flex", gap: "1rem"}}>
                    <UserDisplay></UserDisplay>
                    <Paper sx={{padding: "8px", maxHeight: "135px"}}>
                        <OverallStats price={100}></OverallStats>
                    </Paper>
                    <Paper sx={{padding: "8px", maxWidth: "500px"}}>
                        <FoodEasyDisplay></FoodEasyDisplay>
                    </Paper>
                </Box>
                : <div><h1>Nejsi admin</h1></div>}
        </div>
    )
}