import moment from "moment";
import pfis from "../pfis/pfis.json";

export const currentTime = () => {
  const date = new Date();
  return moment(date).format("LT");
};

export const getDate = (date) => {
  return moment(date).format("lll");
};

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

export function formatPayinLabel(text) {
  const result = text.replace(/([a-z])([A-Z])/g, "$1 $2");
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export const getTransactionIcon = (kind) => {
  switch (kind) {
    case "orderstatus":
      return "mdi-cube-send";
    case "order":
      return "mdi-cube-outline";
    case "rfq":
      return "mdi-package-variant";
    case "close":
      return "mdi-close-circle-outline";
    case "quote":
      return "mdi-format-quote-close";
    default:
      return "";
  }
};

export const groupTransactions = (transactions) => {
  const consolidatedData = transactions.reduce((acc, current) => {
    const exchangeId = current.metadata.exchangeId;

    if (!acc[exchangeId]) {
      acc[exchangeId] = [];
    }

    acc[exchangeId].push(current);

    return acc;
  }, {});

  const result = Object.values(consolidatedData);
  return result;
};
