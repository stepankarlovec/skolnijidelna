import {collection, addDoc, getDocs, orderBy, limit, where, deleteDoc} from "firebase/firestore";
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


export async function updateFoodDb(data: FoodDay) {
    try {
        let myData:any = data;
        getSingleFood(data.id).then((res) => {
           myData.createdAt = res.createdAt;
        });
        await deleteFoodById(data.id);
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

// ily)
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

export async function getSingleFood(foodId: number){
        const colRef = collection(firestore, "food");
        // @ts-ignore
        const q = query(colRef, where("id", "==", foodId))

        // @ts-ignore
        const querySnapshot = await getDocs(q);
        let data: any = {};
        querySnapshot.forEach((doc) => {
            data = doc.data();
        });
        return data;
}

export async function deleteFoodById(id:number) {
    const collectionRef = collection(firestore, "food");
    // @ts-ignore
    const q = query(collectionRef, where("id", "==", id));

    try {
        // @ts-ignore
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
    } catch (error) {
        console.error("Error deleting documents: ", error);
    }
}