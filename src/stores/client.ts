import { handleErrors } from "@/utils/handlers";
import { ErrorDetail, TbdexHttpClient } from "@tbdex/http-client";
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

  console.log(requestBody)
  
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

  if (!response.ok) {
    const errorDetails = (await response.json()) as ErrorDetail[];
    console.log(errorDetails);
  }
}
