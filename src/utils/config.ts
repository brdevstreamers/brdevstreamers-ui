export default {
  baseUrl: process.env.REACT_APP_API_URL ?? "http://localhost:8080",
  auth0ClientId: process.env.REACT_APP_AUTH0_CLIENT_ID ?? "",
  auth0ClientSecret: process.env.REACT_APP_AUTH0_CLIENT_SECRET ?? "",
  auth0ClientAudience: process.env.REACT_APP_AUTH0_CLIENT_AUDIENCE ?? "",
};
