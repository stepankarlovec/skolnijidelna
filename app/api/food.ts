import { collection, addDoc, getDocs } from "firebase/firestore";
import {firestore} from "@/firebase";
import {FoodDay} from "@/app/types";

export async function addFoodDb(data: FoodDay) {
    try {
        const docRef = await addDoc(collection(firestore, "food"), data);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function getLatestFood() {
    const querySnapshot = await getDocs(collection(firestore, "food"));
    let arr:any[] = [];
    querySnapshot.forEach((doc) => {
        arr.push(doc.data());
    });
    return arr;
}

export async function getSingleFood(){

}