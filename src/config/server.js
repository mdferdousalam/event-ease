export const server =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api/v1"
    : "http://localhost:5000";
