import env from "project_source_rn/src/utils/environment";
import { DefaultHeaders } from "project_source_rn/src/utils/api";

export * from './register'

/**
 * Gets Promoter details based on the accessToken
 * @param {String} accessToken 
 */
export const getPromoterDetails = async (accessToken) => {
    return fetch(`${env.API_URL}/apx/promoter`,
        { headers: DefaultHeaders(accessToken) }
    )
}

/**
 * Gets Venue details based on the accessToken
 * @param {String} accessToken 
 */
export const getVenueDetails = async (accessToken) => {
    return fetch(`${env.API_URL}/apx/venue`,
        { headers: DefaultHeaders(accessToken) }
    )
}

/**
 * Returns a list of Promoters
 * @param {String} accessToken 
 */
export const getPromoters = async (accessToken) => {
    return fetch(`${env.API_URL}/apx/promoters`,
        { headers: DefaultHeaders(accessToken) }
    )
}

/**
 * Toggles Event to be saved or unsaved from the users saved list
 * @param {String} accessToken 
 * @param {String} eventId 
 */
export const saveUnsaveEvent = async (accessToken, eventId) => {
    return fetch(`${env.API_URL}/apx/promoters/saved`,
        {
            headers: DefaultHeaders(accessToken),
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({ eventId: eventId })
        }
    )
}

/**
 * Returns all saved events for current user
 * @param {String} accessToken 
 */
export const getSavedEventList = async (accessToken) => {
    return fetch(`${env.API_URL}/apx/promoters/saved`,
        {
            headers: DefaultHeaders(accessToken),
            method: 'GET',
        }
    ).then(response => response.json())
}