"use client";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useEffect, useState} from "react";
import {getLatestFood} from "@/app/api/food";
import getAllPlaces from "@/app/api/places";


const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Album() {
    const [places, setPlaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        setIsLoading(true);
        getAllPlaces()
            .then((res:any) => {
                setPlaces(res);
                setIsLoading(false);
            })
    }, []);

    return (
        <>
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Fantastická Jídelna
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Podívejte se a objednejte si nejlahodnější pokrmy z jedné z našich profesionálních jídelen, kde pro vás vaří naše zlatíčka, paní kuchařky (a kuchaři).
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {!isLoading ?
                    <Grid container spacing={4}>
                        {places.map((place:any) => (
                            <Grid item key={place} xs={12} sm={6} md={4}>
                                <a href={"lunches/"+place.id}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardMedia
                                        component="div"
                                        sx={{
                                            // 16:9
                                            pt: '56.25%',
                                        }}
                                        image="https://source.unsplash.com/random?wallpapers"
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {place?.name}
                                        </Typography>
                                        <Typography>
                                            {place?.location}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Prohlédnout</Button>
                                    </CardActions>
                                </Card>
                                </a>
                            </Grid>
                        ))}
                    </Grid>
                    : <div><p>načítání</p></div>}
                </Container>
            </main>

            {/* End footer */}
    </>
    );
}