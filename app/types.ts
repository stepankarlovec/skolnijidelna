export interface FoodDay {
    id: number,
    placeId: number,
    date: any,
    options: Food[]
}

export interface PossibleDate{
    seconds: number,
    nanoseconds: number,
}

export interface Food{
    name: string,
    price: number,
    alergens: string[],
}
