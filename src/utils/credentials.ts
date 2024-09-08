import { VerifiableCredential } from "@web5/credentials";

export const retrieveCredentials = (jwt: string) => {
  console.log(jwt);
  const { vcDataModel: vc } = VerifiableCredential.parseJwt({ vcJwt: jwt });

  return {
    title: vc.type[1].replace(/(?<!^)(?<![A-Z])[A-Z](?=[a-z])/g, " $&"), // get the last credential type in the array and format it with spaces
    name: vc.credentialSubject["name"],
    countryCode: vc.credentialSubject["countryOfResidence"],
    issuanceDate: new Date(vc.issuanceDate).toLocaleDateString(undefined, {
      dateStyle: "medium",
    }),
  };
};
