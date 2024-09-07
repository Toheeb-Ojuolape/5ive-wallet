import moment from "moment"

export const currentTime = () =>{
    const date  = new Date()
    return moment(date).format("LT")
}

export const getCountry = (country: string) =>{
    if(country === 'BTC')
    {
        return ''
    }
    return country.slice(0,2).toLocaleLowerCase()
}