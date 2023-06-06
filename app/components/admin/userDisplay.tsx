import {useEffect, useState} from "react";
import fetchAllUsers from "@/app/api/user";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import * as React from "react";

export default function UserDisplay(){
    const [users, setUsers] = useState<[]>([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchAllUsers().then((res:any)=>{
            setUsers(res);
            setLoading(false);
        })
    }, []);
    return(
        <>
            {!isLoading ?
                <TableContainer component={Paper} sx={{maxWidth:400}}>
                    <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Uživatelské jméno</TableCell>
                                <TableCell >E-mail</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((row:any) => (
                                <TableRow
                                    key={row?.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row?.name}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row?.email}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                : <div><p>Načítání</p></div>}
        </>
    )
}