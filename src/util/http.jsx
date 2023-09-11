let url = `http://localhost:3000/events`;
export const fetchEvents = async ({ signal, searchTerm }) => {
  console.log(searchTerm);

  if (searchTerm) url += `?search=${searchTerm}`;

  const response = await fetch(url, {
    signal,
  });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
};

export const createNewEvent = async (eventData) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(eventData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("An error occured while creating the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const { event } = await response.json();

  return event;
};
