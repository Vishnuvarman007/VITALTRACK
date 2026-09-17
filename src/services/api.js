/**
 * VITALTRACK REST API Client
 * Future Backend Architecture:
 * React + Vite -> REST API Client -> Spring Boot / FastAPI -> PostgreSQL / ML Service
 * 
 * In this prototype, methods interface with reactive local storage state.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.vitaltrack.internal/v1";

export const apiClient = {
  get: async (endpoint) => {
    // Simulated network latency
    await new Promise((resolve) => setTimeout(resolve, 80));
    return { status: 200, url: `${API_BASE_URL}${endpoint}` };
  },
  post: async (endpoint, payload) => {
    await new Promise((resolve) => setTimeout(resolve, 120));
    return { status: 201, url: `${API_BASE_URL}${endpoint}`, data: payload };
  },
  put: async (endpoint, payload) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return { status: 200, url: `${API_BASE_URL}${endpoint}`, data: payload };
  },
  delete: async (endpoint) => {
    await new Promise((resolve) => setTimeout(resolve, 80));
    return { status: 204, url: `${API_BASE_URL}${endpoint}` };
  }
};
