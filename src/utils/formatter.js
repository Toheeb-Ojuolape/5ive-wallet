import moment from "moment";
import pfis from "@/data/pfis.json";
import { DEFAULTPAYIN } from "@/constants/constant";

export const currentTime = () => {
  const date = new Date();
  return moment(date).format("LT");
};

export const currentDateTime = () => {
  const date = new Date();
  return moment(date).format("lll");
};

export const getDate = (date) => {
  return moment(date).format("lll");
};

export const getCountry = (country) => {
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

export const getPFINameByDid = (did) => {
  const pfi = pfis.pfis.find((pfi) => pfi.did === did);

  return pfi ? pfi.name : "";
};

export const getRequiredPayinDetails = (offering, payin) => {
  const requiredFields =
    offering?.data.payin.methods[payin].requiredPaymentDetails.required;
  if (requiredFields) {
    return requiredFields?.reduce((result, field) => {
      if (Object.hasOwn(DEFAULTPAYIN, field)) {
        result[field] = DEFAULTPAYIN[field];
      }
      return result;
    }, {});
  } else {
    return {};
  }
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

  return result.sort(
    (a, b) =>
      Date.parse(b[0].metadata.createdAt) - Date.parse(a[0].metadata.createdAt)
  );
};

export const getBalances = (balances, currencyCode) => {
  return (
    balances?.find((balance) => balance.currencyCode === currencyCode)
      ?.amount || 0
  );
};

export const getStepTitle = (step, index, steps) => {
  switch (index) {
    case 0:
      return "Request for Quote submitted";
    case 1:
      return "PFI responded with a quote";
    case 2:
      if (index === steps.length - 1) {
        return "Quote closed";
      } else {
        return "Order Submitted Successfully";
      }
    case 3:
      return "Order is being processed";
    case 4:
      return "Order is being processed";
    case 5:
      return "Order processed successfully";
    case 6:
      return " Order closed by PFI";
  }
};

export const getStepDescription = (step, index, steps) => {
  switch (index) {
    case 0:
      return "You successfully created an offer with your selected PFI";
    case 1:
      return "PFI successfully sent a quote to you";
    case 2:
      if (index === steps.length - 1) {
        return `You requested to cancel the quote with reason: ${step.data.reason}`;
      } else {
        return "You successfully submitted your Order to the PFI";
      }
    case 3:
      return `Order currently has status: ${step.data.orderStatus}`;
    case 4:
      return `Order currently has status: ${step.data.orderStatus}`;
    case 5:
      return `Order processed with status: ${step.data.orderStatus}`;
    case 6:
      return `Order closed by PFI with reason: ${step.data.reason}`;
  }
};
