import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function OverallStats(props:{price: Number}){
    const currentDate = new Date();
    const formatDate = currentDate.getDate() + ". " + currentDate.getMonth() + ". " + currentDate.getFullYear();
    return (
        <>
            <h1>Odhadovaná tržba</h1>
            <Typography component="p" variant="h4">
                {props.price.toString()} CZK
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                on {currentDate.toLocaleString("cs-CS")}
            </Typography>
            <div>
                <Link color="primary" href="#">
                    Objednávky
                </Link>
            </div>
        </>
    )
}