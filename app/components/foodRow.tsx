import {Box} from "@mui/system";
import {Popper} from "@mui/base";
import Fade from "@mui/material/Fade";
import * as React from "react";
import {useState} from "react";

interface FoodRowProps {
    name: string;
    index: number;
    price: number;
    alergens: string[];
    isChecked: boolean;
    onCheckboxChange: (name: string) => void;
}

export default function FoodRow(props: FoodRowProps) {
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        //const { checked } = event.target;
        //setIsChecked(checked);
        props.onCheckboxChange(props.name);
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'transition-popper' : undefined;

    return (
        <Box sx={{display: 'flex', width:'100', justifyContent:'space-around', marginY: '0.5rem'}}>
            <p>{props.name}</p>
            <input type={"checkbox"} checked={props.isChecked} onChange={handleCheckboxChange} ></input>
            <p>{props.price} CZK</p>
            <button aria-describedby={id} type="button" onClick={handleClick}>
                {open ? 'Zavřít alergeny' : 'Zobrazit alergeny'}
            </button>
            <Popper id={id} open={open} anchorEl={anchorEl} transition>
                {({TransitionProps}) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Box sx={{border: 1, p: 1, bgcolor: 'white', display:'flex', flexDirection:'column'}}>
                            {props.alergens.map((alergen) => (
                                <ul>
                                    <li>- {alergen}</li>
                                </ul>
                            ))}
                        </Box>
                    </Fade>
                )}
            </Popper>
        </Box>
    )
}