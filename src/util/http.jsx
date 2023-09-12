import { QueryClient } from "@tanstack/react-query";

/**
 * Events URL from Backend
 *
 * @type {string}
 */
let url = `http://localhost:3000/events`;

export const queryClient = new QueryClient();

/**
 * Custom Error
 *
 * @async
 * @param {string} title
 * @param {*} response
 * @returns {error}
 */
export const customError = async (title, response) => {
  const error = new Error(title);
  error.code = response.status;
  error.info = await response.json();
  throw error;
};

/**
 * FetchEvents - GET Request
 *
 * @async
 * @param {{ signal: any; searchTerm: string; }} { signal, searchTerm }
 * @returns {events}
 */
export const fetchEvents = async ({ signal, searchTerm }) => {
  console.log(searchTerm);

  if (searchTerm) url += `?search=${searchTerm}`;

  const response = await fetch(url, {
    signal,
  });

  if (!response.ok) {
    await customError("An error occurred while fetching the events", response);
  }

  const { events } = await response.json();

  return events;
};

/**
 * Create New Event - POST Request
 *
 * @async
 * @param {*} eventData
 * @returns {event}
 */
export const createNewEvent = async (eventData) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(eventData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    await customError("An error occured while creating the event", response);
  }
  const { event } = await response.json();

  return event;
};

/**
 * Fetch Selectable Images
 *
 * @async
 * @param {{ signal: any; }} { signal }
 * @returns {images}
 */
export const fetchSelectableImages = async ({ signal }) => {
  const response = await fetch(`${url}/images`, { signal });

  if (!response.ok) {
    await customError("An error occured while fetching the images", response);
  }

  const { images } = await response.json();

  return images;
};

/**
 * Fetch an event by ID
 *
 * @async
 * @param {{ id: any; signal: any; }} { id, signal }
 * @returns {event}
 */
export const fetchEvent = async ({ id, signal }) => {
  const response = await fetch(`${url}/${id}`, { signal });

  if (!response.ok) {
    await customError("An error occured while fetching the event", response);
  }

  const { event } = await response.json();

  return event;
};

/**
 * Delete an event by Id
 *
 * @async
 * @param {{ id: any; }} { id }
 * @returns {unknown}
 */
export const deleteEvent = async ({ id }) => {
  const response = await fetch(`${url}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    await customError("An error occured while deleting the event", response);
  }

  return response.json();
};
