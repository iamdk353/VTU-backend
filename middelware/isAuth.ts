import { auth } from "express-oauth2-jwt-bearer";

const jwtCheck = auth({
  audience: "VTU Notify",
  issuerBaseURL: "https://dev-qs30ugxw6a5rhmjd.us.auth0.com/",
  tokenSigningAlg: "RS256",
});
export default jwtCheck;
