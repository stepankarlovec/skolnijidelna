"use client"

import Navbar from "./components/navbar";
import './globals.css';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {Divider} from "@mui/material";

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="cs">
        <body>
        <Navbar></Navbar>
        <div className="mx-5 my-5">
            {children}
        </div>
        <Divider></Divider>
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
            <Typography variant="h6" align="center" gutterBottom>
                Sledujte <b>Fantastická Jídelna</b> na sociálních sítích!
            </Typography>
            <Typography
                variant="subtitle1"
                align="center"
                color="text.secondary"
                component="p"
            >
                Created as a school project Delta 2023
            </Typography>
        </Box>
        </body>
        </html>
    );
}