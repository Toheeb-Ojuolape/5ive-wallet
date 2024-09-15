# 5ive-wallet - Web 5 in your pocket!

# 💸 Overview
The 5ive wallet is a web-based mobile wallet application that leverages Tbdex and Web5 to enable users to seamlessly send money across the world without the need for a 3rd party, KYC or middleman while retaining ownership and control over their personal data. This solution is really important as it solves a key problem faced especially by countries in Africa and the global south. 

The project was built with Vuejs (Javascript) and in just 5 days ( I barely slept 😿 for 10 hours within that time . Yes, I learnt about the hackathon late, but that didn't stop me from putting my best foot forward ✊🏾. I hope it's good enough 🥺). 

I initially started with Typescript but had to switch to Javascript due to some deployment issues (the Typescript version of the code is available on the **typescript-version** branch)

# ⚙️ Design Consideration
In meeting with the design requirements for the hackathon, several features were developed into the 5ive app: 

## 1. 🤑 Profitability:
The wallet has a set of free and premium features that enable users to send money, manage their data and connect with Available PFIs. The premium features include:

- **Instant Swap ⚡️:** a feature where the wallet automatically selects the best available offers based on the exchange rate and enables users to send money in 3 simple steps
  
- **Wallet Insights 📈:** an analytics feature that enables users to gain deeper insights into their activities on the 5ive wallet so they get to make better money moves 💰.

All Premium features are available for only 1,000 SATS (BTC) per year (for now 😉). 

Subscription payments are being processed using the Alby's JS lightning tool to generate a Lightning invoice and listen for payments. 

## 2. 🤔 Optionality:
The wallet's basic send feature is a chat-like interface that enables users to have a "conversation" with the Tbdex by sending messages back and forth. When a currency exchange pair is selected, the wallet shares a list of available offers and places a chip on the most recommended offer, even though users still have to choose the one they prefer. 

## 3. 👤 Customer Management:
Users **DO NOT** need to provide their name, email or address when signing up on the 5ive wallet. All they need to do is click on the Get started button after which a BearerDid is generated for them. This DID would be used to sign their transactions and facilitate conversations with the PFIs. Users are only prompted for their name and country to generate Verifiable Credentials (VCs) at the point of trying to request a quote from a PFI. 

Users also have the option to export their DID from the profile page and use it to login on the platform on the same device or another device after logging out while still retaining their user data and preferences on the wallet. This feature is powered by 5ive's Decentralized Web Node ([available here](https://github.com/Toheeb-Ojuolape/5ive-api)) that contains two simple endpoints for creating/updating a record in Web5 and for querying the record using the user's Decentralized Identifier (DID) as a filter.

## 4. 🌟 Customer Satisfaction:
After an order has been submitted successfully, customers have the ability to rate the PFIs on a 5-star scale. This data gets fed into the Wallets Insights feature which gives users a better understanding of their preferences. The data is also uploaded to 5ive's Decentralized Web Node so that users continue have access to this information moving forward. 


# Other features (Built for Fun 🥳 and....better User Experience 🙃)

## 1. Home Screen 🏡
- **Wallet 🪪** : The dashboard screen shows Activity balance which is the amount of **Payment Received (i.e payout)** from PFIs once orders have been completed.
- **Learn 📚** : The technologies behind Web5 are so brilliant and yet so novel, so there is a Learn feature that enables users to watch and read useful content related to Web5
- **Notifications 🔔** : This screen shows a list of notifications based on your activities on the 5ive wallet
- **Recent Transactions 🪵**: This feature shows the user's 5 most recent transactions arranged chronologically. You can also **click on the transactions** to see the full details of communication between the user and PFI. 

## 2. Activity Screen 🥏
This shows a list of all transactions carried out by the User on the 5ive wallet. You can also **click on the transactions** to see the full details of communication between the user and PFI. 

## 3. Profile Screen 👤
This screen contains details about the user and enables them to update their profile, select a nice memoji avatar, switch to Light/Dark mode, Track their subscription status and export their DID for logging in later. 


# 🚦 Project Setup
To run the project locally, you need:

## Pre-requisites
To run this project you need:

- Node.js version 16 or greater
- Text Editor, preferably Visual Studio Code.
- Web Browser,  preferably Google Chrome.

## 🛠️ Setup
**Step 1:**  Clone the repo:
```
git clone https://github.com/Toheeb-Ojuolape/5ive-wallet.git
```
**Step 2:**  Change the directory to 5ive-wallet
```
cd 5ive-wallet
```
**Step 3:** Install all the required dependencies (using npm in our case)
```
npm install
```
**Step 4:** Run the project locally by starting the server
```
npm run serve
```
## 👨🏾‍💻 Configuration
You can optionally create a .env file which would contain some key constants I used like:

```
- VUE_APP_MERCHANT_LN_ADDRESS: your Alby Lightning Address  (If you have one)
- VUE_API_URL: the API URL for the Decentralized Web Node I developed for the project (([available here](https://github.com/Toheeb-Ojuolape/5ive-api))).
```

These values are also sorta hard-coded in the constants file in src, so no issues if you don't specify 😉.

## 🔗 Deployment
The wallet is deployed on Netlify, you can test with this URL:

- 👉🏾 ([Link](https://5ive.netlify.app))


# 👋🏽 Final Remark 
Working on this project was alot of ~~headaches~~ ~~bugs~~ ~~issues~~ ~~errors~~ ~~fixes~~ **FUN**. Tbd's Web5's technology is truly revolutionary and is exactly what the global south needs and I'm glad I decided to participate. I hope you find my project worthy to be selected as a finalist 🥺
