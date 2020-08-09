export const BASE_URL = "https://cirdles.cs.cofc.edu/Services";
export const AMBAPO_ENDPOINT = BASE_URL + "/ambapo";
export const SQUID_ENDPOINT = BASE_URL + "/prawn";
export const TOPSOIL_ENDPOINT = BASE_URL + "/topsoil";
export const MARS_ENDPOINT = BASE_URL + "/mars";

// Sesar APIs
export const SESAR_BASE_URL = "https://sesardev.geosamples.org";
export const SESAR_LOGIN =
  SESAR_BASE_URL + "/webservices/credentials_service_v2.php";
export const SESAR_SAMPLE_PROFILE =
  SESAR_BASE_URL + "/webservices/display.php?igsn=";
export const SESAR_USER_SAMPLES = SESAR_BASE_URL + "/samples/user_code/";

export const POST_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
