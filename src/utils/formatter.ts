import moment from "moment";
import pfis from "../pfis/pfis.json";

export const currentTime = () => {
  const date = new Date();
  return moment(date).format("LT");
};

export const getDate = (date) =>{
  return moment(date).format('lll')
}

export const getCountry = (country: string) => {
  if (country === "BTC") {
    return "";
  }
  return country.slice(0, 2).toLocaleLowerCase();
};

export const getPFIName = (offering) => {
  let pfi = pfis.pfis.find((pfi) => pfi.did === offering.metadata.from);

  if (!pfi) {
    pfi = pfis.pfis.find((pfi) => pfi.did === offering.metadata.to);
  }

  return pfi ? pfi.name : "";
};

export const formatAmount = (number) => {
  return number.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};


export const getTransactionIcon = (kind) =>{
  switch(kind){
    case 'orderstatus':
      return 'mdi-cube-send'
    case 'order':
      return 'mdi-cube-outline'
    case 'rfq':
      return 'mdi-package-variant'
    case 'close':
      return 'mdi-close-circle-outline'
    case 'quote':
      return 'mdi-format-quote-close'
    default:
      return ''
  }
}