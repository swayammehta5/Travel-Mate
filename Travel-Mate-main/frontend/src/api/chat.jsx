import client from './client.jsx';

export const chatAPI = {
  getMessages: (tripId) => client.get(`/chat/${tripId}`),
  unsendMessage: (tripId, messageId) => client.delete(`/chat/${tripId}/${messageId}`),
};

