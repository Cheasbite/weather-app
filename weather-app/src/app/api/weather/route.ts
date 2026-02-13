import { NextRequest } from "next/server";

const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
const no_cache = `no-store`
const temperature_degree_type = "metric"

async function geoLocation(city: string) {
    const GeoLocation_request = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`, {cache: no_cache})

    if (!GeoLocation_request.ok) {
        return [null, null]
    }
    const geoLocation_data = await GeoLocation_request.json()
    const lat: number = geoLocation_data[0].lat
    const lon: number = geoLocation_data[0].lon

    return [lat, lon]
}

async function cityLocation(lattitude: number | null, longtitude: number | null) {
    if (lattitude === null && longtitude === null) {
        return null
    }
    const weather_request = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lattitude}&lon=${longtitude}&appid=${apiKey}&units=${temperature_degree_type}`)
    const weather_data = await weather_request.json()

    return weather_data
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const user_city = searchParams.get('city')
    if (user_city === null) {
        return Response.json({error: "null", status: 404})
    }

    const [lat, lon] = await geoLocation(user_city)
    if (lat === null && lon === null) {
        return Response.json({error: "null", status: 404})
    }

    const weather_data = await cityLocation(lat, lon)
    if (weather_data === null) {
        return Response.json({error: "null", status: 404})
    }

    return Response.json(weather_data)
}