import env from "project_source_rn/src/utils/environment";
import { DefaultHeaders } from "project_source_rn/src/utils/api";


/**
 * Returns all a venues received payments
 * @param {String} accessToken 
 */
export const getVenueReceivedPayments = async (accessToken) => {
    return fetch(`${env.API_URL}/apx/payments`, {
        headers: DefaultHeaders(accessToken),
    })
}

/**
 * Creates a payment from a venue
 * @param {String} accessToken 
 * @param {Object} paymentData 
 */
export const createPayment = async (accessToken, paymentData) => {
    return fetch(`${env.API_URL}/apx/payments`, {
        headers: DefaultHeaders(accessToken),
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(paymentData)
    })
}

/**
 * Returns due payment for the venue
 * @param {String} accessToken 
 */
export const getDuePayments = async (accessToken) => {
    return fetch(`${env.API_URL}/apx/payments/due`, {
        headers: DefaultHeaders(accessToken),
    })
}


/**
 * Sends email for scheduled cash pickup
 * @param {String} accessToken 
 * @param {Object} venueData 
 */
export const createScheduledCashEmail = async (accessToken, venueData) => {
    return fetch(`${env.API_URL}/apx/payments/cash/scheduled`, {
        headers: DefaultHeaders(accessToken),
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(venueData)
    })
}