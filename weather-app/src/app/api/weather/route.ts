import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const Psearch = request.nextUrl.searchParams
    const city = Psearch.get('city')
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
    const GetGeoLocation = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`, {cache: `no-store`})
    if (!GetGeoLocation.ok && city !== null) {
        return Response.json({error: "Failed to fetch"}, {status: 404});
    }
    const JSONGeoLocation = await GetGeoLocation.json()

    const lat = JSONGeoLocation[0].lat
    const lon = JSONGeoLocation[0].lon
    const req = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    const data = await req.json()

    return Response.json(data)
}