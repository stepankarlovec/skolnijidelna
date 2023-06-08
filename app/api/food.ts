import {collection, addDoc, getDocs, orderBy, limit, where} from "firebase/firestore";
import {firestore} from "@/firebase";
import {FoodDay} from "@/app/types";
import {query} from "@firebase/database";

export async function addFoodDb(data: FoodDay) {
    try {
        let myData:any = data;
        myData.createdAt = new Date();
        const docRef = await addDoc(collection(firestore, "food"), myData);
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

// ily
export async function getLatestFoodFrom(id: number) {
    const colRef = collection(firestore, "food");
    // @ts-ignore
    const q = query(colRef, where("placeId", "==", id), orderBy("date", "desc"));

    // @ts-ignore
    const querySnapshot = await getDocs(q);
    const arr: any[] = [];
    querySnapshot.forEach((doc) => {
        arr.push(doc.data());
    });
    return arr;
}

export async function getLastCreatedDocument(collectionPath: string): Promise<any> {
    const collectionRef = collection(firestore, collectionPath);
    // @ts-ignore
    const q = query(collectionRef, orderBy('createdAt', 'desc'), limit(1));
    // @ts-ignore
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        return null; // Return null if collection is empty
    }

    // Extract and return the last created document
    const lastCreatedDocument = querySnapshot.docs[0].data();
    return lastCreatedDocument;
}

export async function getSingleFood(){

}