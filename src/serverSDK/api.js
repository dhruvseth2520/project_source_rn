import env from "../utils/environment";

const DefaultHeaders = (accessToken) => {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
    }
}

/**
 * Gets Promoter details based on the accessToken
 * @param {String} accessToken 
 */
export const apiPromoterDetails = async (accessToken) => {
    return fetch(`${env.API_URL}/apx/promoter`,
        { headers: DefaultHeaders(accessToken) }
    )
}

/**
 * Gets Venue details based on the accessToken
 * @param {String} accessToken 
 */
export const apiVenueDetails = async (accessToken) => {
    return fetch(`${env.API_URL}/apx/venue`,
        { headers: DefaultHeaders(accessToken) }
    )
}

/**
 * Registers Promoter
 * @param {String} accessToken 
 * @param {Object} promoterData 
 */
export const apiRegisterPromoter = async (accessToken, promoterData) => {
    return fetch(`${env.API_URL}/apx/register/promoter`, {
        headers: DefaultHeaders(accessToken),
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(promoterData)
    }).then(response => response.json())
}

/**
 * Registers Promoter
 * @param {String} accessToken 
 * @param {Object} promoterData 
 */
export const apiRegisterVenue = async (accessToken, venueData) => {
    return fetch(`${env.API_URL}/apx/register/venue`, {
        headers: DefaultHeaders(accessToken),
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(venueData)
    }).then(response => response.json())
}

/**
 * Returns a list of Promoters
 * @param {String} accessToken 
 */
export const apiPromoters = async (accessToken) => {
    return fetch(`${env.API_URL}/apx/promoters`,
        { headers: DefaultHeaders(accessToken) }
    )
}

/**
 * Toggles Event to be saved or unsaved from the users saved list
 * @param {String} accessToken 
 * @param {String} eventId 
 */
export const apiToggleEvent = async (accessToken, eventId) => {
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
export const apiSavedEventList = async (accessToken) => {
    return fetch(`${env.API_URL}/apx/promoters/saved`,
        {
            headers: DefaultHeaders(accessToken),
            method: 'GET',
        }
    ).then(response => response.json())
}