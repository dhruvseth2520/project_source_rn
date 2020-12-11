import env from "../utils/environment";
import { getData } from '../utils/localStorage'

const getDefaultHeaders = () => {
    getData('@accessToken').then(accessToken => {
        return {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    })
}

export const apiPromoterDetails = () => {
    var response = fetch(`${env.API_URL}/apx/promoter`,
        { headers: getDefaultHeaders() }
    )
    return response
}

export const apiVenueDetails = () => {
    var response = fetch(`${env.API_URL}/apx/promoter`,
        { headers: getDefaultHeaders() }
    )
    return response
}