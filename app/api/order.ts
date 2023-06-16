import {FoodDay} from "@/app/types";
import {addDoc, collection, query, where, getDocs} from "firebase/firestore";
import {firestore} from "@/firebase";

export async function createOrder(choices: any, placeId: number, userId: any){
    try {

        choices.forEach((choice: any) => {
            let myData:any = {};
            myData.createdAt = new Date();
            myData.placeId = placeId;
            myData.userId = userId;
            myData.choice = choice.food;
            myData.foodId = choice.id;
            const docRef = addDoc(collection(firestore, "choices"), myData);
        });
        console.log("Document written");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function getUsersOrders(id: string|undefined, placeId: number) {
    //console.log(id);
    //console.log(placeId);
    const colRef = collection(firestore, "choices");
    // @ts-ignore
    const q = query(colRef, where("userId", "==", id), where("placeId", "==", placeId));

    // @ts-ignore
    const querySnapshot = await getDocs(q);
    const arr: any[] = [];
    querySnapshot.forEach((doc:any) => {
        arr.push(doc.data());
    });
    return arr;
}