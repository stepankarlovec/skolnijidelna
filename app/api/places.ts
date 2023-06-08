import {collection, getDocs} from "firebase/firestore";
import {firestore} from "@/firebase";

export default async function  (){
    const querySnapshot = await getDocs(collection(firestore, "places"));
    let arr:any[] = [];
    querySnapshot.forEach((doc) => {
        arr.push(doc.data());
    });
    return arr;
}