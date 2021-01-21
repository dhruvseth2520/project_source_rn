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
    }).then(response => response.json())
}

/**
 * Update Event based on eventData
 * @param {String} accessToken
 * @param {Object} eventData
 */
export const updateEvent = async (accessToken, eventData) => {
    return fetch(`${env.API_URL}/apx/events/update`, {
        headers: DefaultHeaders(accessToken),
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(eventData)
    }).then(response => response.json())
}

/**
 * Returns a list of all the events
 * @param {String} accessToken
 */
export const getAllEvents = async (accessToken) => {
    return fetch(`${env.API_URL}/apx/events`, {
        headers: DefaultHeaders(accessToken),
    }).then(response => response.json())
}

/**
 * Return an Event based on its ID
 * @param {String} accessToken
 * @param {String} eventId
 */
export const getEvent = async (accessToken, eventId) => {
    return fetch(`${env.API_URL}/apx/events/${eventId}`, {
        headers: DefaultHeaders(accessToken),
    }).then(response => response.json())
}

/**
 * Returns all events from a Venue using it's accessToken
 * @param {String} accessToken
 */
export const getEventfromAccessToken = async (accessToken) => {
    return fetch(`${env.API_URL}/apx/events/venue`, {
        headers: DefaultHeaders(accessToken),
    }).then(response => response.json())
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
    }).then(response => response.json())
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
        body: JSON.stringify(attendanceData)
    }).then(response => response.json())
}

/**
 * Returns attendance from an event from its eventId
 * @param {String} accessToken
 * @param {Object} eventId
 */
export const getAttendanceFromEventId = async (accessToken, eventId) => {
    return fetch(`${env.API_URL}/apx/events/attendance/event/${eventId}`, {
        headers: DefaultHeaders(accessToken)
    }).then(response => response.json())
}

/**
 * Returns attendance on a venue based on the userId in the accessToken
 * @param {String} accessToken
 */
export const getAttendanceForVenueFromAccessToken = async (accessToken) => {
    return fetch(`${env.API_URL}/apx/events/attendance/venue`, {
        headers: DefaultHeaders(accessToken)
    }).then(response => response.json())
}
