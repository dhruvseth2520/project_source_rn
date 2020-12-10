import env from "project_source_rn/src/utils/environment";
import { DefaultHeaders } from "project_source_rn/src/utils/api";

/**
 * Registers Promoter
 * @param {String} accessToken 
 * @param {Object} promoterData 
 */
export const registerPromoter = async (accessToken, promoterData) => {
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
export const registerVenue = async (accessToken, venueData) => {
    return fetch(`${env.API_URL}/apx/register/venue`, {
        headers: DefaultHeaders(accessToken),
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(venueData)
    }).then(response => response.json())
}

