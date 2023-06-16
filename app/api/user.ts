import {collection, addDoc, getDocs, where} from "firebase/firestore";
import {firestore} from "@/firebase";
import {FoodDay} from "@/app/types";
import {query} from "@firebase/database";

export default async function fetchAllUsers() {
    try {
        const querySnapshot = await getDocs(collection(firestore, "users"));

        const userData = querySnapshot.docs.map((doc) => {
            const user = doc.data();
            const userId = doc.id;
            return { id: userId, ...user };
        });

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

export async function isUserInAdminList(){

}





