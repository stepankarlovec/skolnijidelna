import {collection, addDoc, getDocs, where, deleteDoc} from "firebase/firestore";
import {firestore} from "@/firebase";
import {FoodDay} from "@/app/types";
import {query} from "@firebase/database";

export default async function fetchAllUsers() {
    try {
        const querySnapshot = await getDocs(collection(firestore, "users"));

        const userDataPromises = querySnapshot.docs.map(async (doc) => {
            const user = doc.data();
            const userId = doc.id;
            const userIsAdmin = await isUserInAdminList(user.email);
            return { id: userId, isAdmin: userIsAdmin, ...user };
        });

        const userData = await Promise.all(userDataPromises);
        return userData;
    } catch (error) {
        // Handle error
        console.error('Error getting users:', error);
        return [];
    }
}

async function checkEmailExists(email: string): Promise<boolean> {
    const usersRef = collection(firestore, 'users');
    // @ts-ignore
    const q = query(usersRef, where('email', '==', email));
    // @ts-ignore
    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty;
}

export async function createNewUserIfUnique(data:any){
    try {
        checkEmailExists(data.email).then(async (exists) =>{
            if(!exists){
                const docRef = await addDoc(collection(firestore, "users"), {
                    name: data.displayName,
                    email: data.email,
                    accessToken: data.accessToken,
                    admin: 0
                });
                console.log("Created new user with ID: ", docRef.id);
            }
        })
    } catch (e) {
        console.error("Error creating new user" +
            ": ", e);
    }
}

export async function isUserInAdminList(uid:any){
    const usersRef = collection(firestore, 'admin');
    // @ts-ignore
    const q = query(usersRef, where('email', '==', uid));
    // @ts-ignore
    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty;
}

export async function addAdmin(email: string){
    try {
        const docRef = await addDoc(collection(firestore, "admin"), {
            email: email
        });
        console.log("Created new admin with ID: ", docRef.id);
    } catch (e) {
        console.error("Error creating new admin" +
            ": ", e);
    }
}

export async function removeAdmin(email: string){
        try {
            const usersRef = collection(firestore, 'admin');
            // @ts-ignore
            const q = query(usersRef, where('email', '==', email));
            // @ts-ignore
            const querySnapshot = await getDocs(q);

            const deletePromises = querySnapshot.docs.map((doc) => {
                return deleteDoc(doc.ref);
            });

            await Promise.all(deletePromises);
            console.log("Admin removed successfully.");
        } catch (error) {
            console.error("Error removing admin:", error);
        }
}




