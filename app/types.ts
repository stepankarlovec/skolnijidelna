export interface FoodDay {
    id: number,
    date: string,
    options: Food[]
}

export interface Food{
    name: string,
    price: number,
    alergens: string[],
}
