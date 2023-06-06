export interface FoodDay {
    id: number,
    date: PossibleDate|Date,
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
