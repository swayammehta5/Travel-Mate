import client from './client.jsx';

export const itineraryAPI = {
  getByTrip: (tripId) =>
    client.get(`/itinerary/${tripId}`),

  create: (tripId, data) =>
    client.post(`/itinerary/${tripId}`, data),

  update: (id, data) =>
    client.put(`/itinerary/${id}`, data),

  delete: (id) =>
    client.delete(`/itinerary/${id}`),
};

