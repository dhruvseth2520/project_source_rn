import env from "project_source_rn/src/utils/environment";
import { DefaultHeaders } from "project_source_rn/src/utils/api";

/**
 * Creates new Event based on eventData
 * @param {String} accessToken 
 * @param {Object} eventData 
 */
export const createEvent = async (accessToken, eventData) => {
    return fetch(`${env.API_URL}/apx/events/create`, {
        headers: DefaultHeaders(accessToken),
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(eventData)
    })
}

/**
 * Update Event based on eventData
 * @param {String} accessToken 
 * @param {Object} eventData 
 */
export const createEvent = async (accessToken, eventData) => {
    return fetch(`${env.API_URL}/apx/events/update`, {
        headers: DefaultHeaders(accessToken),
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(eventData)
    })
}

/**
 * Returns a list of all the events
 * @param {String} accessToken 
 */
export const getAllEvents = async (accessToken) => {
    return fetch(`${env.API_URL}/apx/events`, {
        headers: DefaultHeaders(accessToken),
    })
}

/**
 * Return an Event based on its ID
 * @param {String} accessToken 
 * @param {String} eventId 
 */
export const getEvent = async (accessToken, eventId) => {
    return fetch(`${env.API_URL}/apx/events/${eventId}`, {
        headers: DefaultHeaders(accessToken),
    })
}

/**
 * Returns all events from a Venue using it's venueId
 * @param {String} accessToken 
 * @param {String} venueId 
 */
export const getEventfromVenueId = async (accessToken, venueId) => {
    return fetch(`${env.API_URL}/apx/events/venue/${venueId}`, {
        headers: DefaultHeaders(accessToken),
    })
}

/**
 * Deletes event using it's eventId
 * @param {String} accessToken 
 * @param {String} eventId 
 */
export const deleteEvent = async (accessToken, eventId) => {
    return fetch(`${env.API_URL}/apx/events/${eventId}`, {
        headers: DefaultHeaders(accessToken),
        method: 'DELETE',
        mode: 'cors',
        body: JSON.stringify({ eventId: eventId })
    })
}

/**
 * Register attendance for an event
 * @param {String} accessToken 
 * @param {Object} attendanceData 
 */
export const registerAttendance = async (accessToken, attendanceData) => {
    return fetch(`${env.API_URL}/apx/events/attendance`, {
        headers: DefaultHeaders(accessToken),
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({ attendanceData })
    })
}

/**
 * Returns attendance from an event from its eventId
 * @param {String} accessToken 
 * @param {Object} eventId 
 */
export const getAttendanceFromEventId = async (accessToken, eventId) => {
    return fetch(`${env.API_URL}/apx/events/attendance/${eventId}`, {
        headers: DefaultHeaders(accessToken)
    })
}

/**
 * Returns attendance on a venue based on the userId in the accessToken
 * @param {String} accessToken 
 */
export const getAttendanceForVenueFromAccessToken = async (accessToken) => {
    return fetch(`${env.API_URL}/apx/events/attendance/venue`, {
        headers: DefaultHeaders(accessToken)
    })
}