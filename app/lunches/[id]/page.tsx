"use client";
import FoodsTable from "@/app/components/foodsTable";
import {usePathname} from "next/navigation";


export default function Lunches() {
    const router = usePathname();
    return (
        <div>
            <h1 className="text-5xl">Obědy</h1>
            <FoodsTable id={Number(router.split("/").pop())}></FoodsTable>
        </div>
    )
}
