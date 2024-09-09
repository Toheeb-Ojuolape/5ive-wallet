import { handleErrors } from "@/utils/handlers";
import {  TbdexHttpClient } from "@tbdex/http-client";
import { Jwt } from "@web5/credentials";
import { JwtPayload } from "@web5/crypto";
import axios from "axios";

export async function sendMessage(
  pfiDid: string,
  verb: "GET" | "PUT" | "POST",
  path: string,
  requestBody: any
): Promise<void> {
  const pfiServiceEndpoint = await TbdexHttpClient.getPfiServiceEndpoint(
    pfiDid
  );
  const apiRoute = `${pfiServiceEndpoint}${path}`;
  
  let response: Response;
  try {
    response = await axios({
      method: verb,
      url: apiRoute,
      headers: { "Content-Type": "application/json" },
      data: requestBody, // requestBody passed directly in data
    });
  } catch (e) {
    console.log(e);
    handleErrors(e);
  }

  console.log(response)
}




export async function generateToken(offering, did){

const currentTimeInSeconds = Math.floor(Date.now() / 1000); // Get current Unix timestamp in seconds
const expirationTime = currentTimeInSeconds + 600; // Add 600 seconds (10 minutes)

const jwtPayload: JwtPayload = {
  aud: offering.metadata.from,
  iss: did.uri,
  exp: expirationTime, // Set expiration to 10 minutes from now
  iat: currentTimeInSeconds, // Issued at current time
  jti: "01j79x5y1xf9mabkpey352e1tw", // unique identifier for the token
};

// Sign the JWT with the correct header
const token = await Jwt.sign({
  signerDid: did,
  payload: jwtPayload,
});

return token
}