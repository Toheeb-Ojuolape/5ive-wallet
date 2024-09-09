import moment from "moment";
import pfis from "../pfis/pfis.json";

export const currentTime = () => {
  const date = new Date();
  return moment(date).format("LT");
};

export const getCountry = (country: string) => {
  if (country === "BTC") {
    return "";
  }
  return country.slice(0, 2).toLocaleLowerCase();
};

export const getPFIName = (offering) => {
  return pfis.pfis.find((pfi) => pfi.did === offering.metadata.from).name;
};
