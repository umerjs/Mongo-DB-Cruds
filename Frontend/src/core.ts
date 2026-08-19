const configuredBackendUrl = import.meta.env.VITE_BACKEND_URL;

export const BACKEND_URL = configuredBackendUrl || "http://localhost:2002";
export const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || window.location.origin;
