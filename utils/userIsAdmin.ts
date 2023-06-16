"use client";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/firebase";


export default function userIsAdmin(){
    const [user, loading, error] = useAuthState(auth);
    if (loading) return false;
    if (error) return false;
    if (!user) return false;

    isUserInAdminList(user.uid).then((res) => {

    });
}