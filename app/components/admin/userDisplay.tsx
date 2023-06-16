import {useEffect, useState} from "react";
import fetchAllUsers, {addAdmin, isUserInAdminList, removeAdmin} from "@/app/api/user";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import Button from "@mui/material/Button";

export default function UserDisplay(){
    const [users, setUsers] = useState<[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [userLoading, setUserLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetchAllUsers().then((res:any)=>{
            console.log(res);
            setUsers(res);
            setLoading(false);
        })
    }, []);
    return(
        <>
            {!isLoading ?
                <TableContainer component={Paper} sx={{maxWidth:450}}>
                    <Table sx={{ minWidth: 420 }} size="small" aria-label="a dense table">
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
                                    {row?.isAdmin ?
                                    <TableCell key={row?.email} component="th" scope="row">
                                        <Button onClick={()=>{removeAdmin(row?.email).then(()=>{location.reload()})}}>Odebrat admina</Button>
                                    </TableCell>
                                    : <TableCell component="th" scope="row">
                                            <Button onClick={()=>{addAdmin(row?.email).then(()=>{location.reload()})}}>Přidat admina</Button>
                                      </TableCell>
                                    }
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                : <div><p>Načítání</p></div>}
        </>
    )
}