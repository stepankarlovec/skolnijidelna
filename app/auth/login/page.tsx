"use client";
import {GoogleAuthProvider, signInWithPopup} from "@firebase/auth";
import {auth} from "@/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useEffect, useState} from "react";
import {redirect} from "next/navigation";
import {createNewUserIfUnique} from "@/app/api/user";

export default function Login() {
    const [user, setUser] = useAuthState(auth);
    const googleAuth = new GoogleAuthProvider();
    const signUp = async () => {
        const result = await signInWithPopup(auth, googleAuth).then((res)=>{
            console.log(res.user);
            createNewUserIfUnique(res.user);
        });
    }

    useEffect(()=>{
    },[user])

    return (
        <>
            <img src="https://onymos.com/wp-content/uploads/2020/10/google-signin-button.png" onClick={signUp} alt="image" width={350} style={{cursor:"pointer"}}/>
            {user ? <button onClick={()=>{auth.signOut()}}>Odhlásit</button> : ""}
        </>
    )
}