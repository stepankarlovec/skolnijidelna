"use client";

import * as React from 'react';
import UserDisplay from "@/app/components/admin/userDisplay";
import OverallStats from "@/app/components/admin/overallStats";
import Paper from "@mui/material/Paper";
import {Box} from "@mui/system";
import FoodEasyDisplay from "@/app/components/admin/foodEasyDisplay";

export default function AdminPanel() {
    return (
        <div>
            <Box sx={{display: "flex", gap: "1rem"}}>
                <UserDisplay></UserDisplay>
                <Paper sx={{padding: "8px", maxHeight: "135px"}}>
                    <OverallStats price={100}></OverallStats>
                </Paper>
                <Paper sx={{padding:"8px", maxWidth: "500px"}}>
                    <FoodEasyDisplay></FoodEasyDisplay>
                </Paper>
            </Box>
        </div>
    )
}