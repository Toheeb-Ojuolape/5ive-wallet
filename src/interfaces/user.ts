export interface Country{
    name: string,
    code: string
}


export interface User{
    name: string,
    country: Country,
    image: string
}