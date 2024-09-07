// src/stores/offerings.ts
import { Offering, TbdexHttpClient } from '@tbdex/http-client'
import { DidServiceEndpoint } from '@web5/dids'
import axios from 'axios'
import { defineStore } from 'pinia'

// Define the store
export const useOfferingsStore = defineStore('offerings', {
  state: () => ({
    offerings: [] as Offering[],
  }),
  actions: {
    // Add a new offering
    addOffering (newOffering: Offering) {
      this.offerings.push(newOffering)
    },
    // Remove an offering by id
    removeOffering (id: string) {
      this.offerings = this.offerings.filter(
        (offering: { id: string }) => offering.id !== id
      )
    },
    // Update an offering by id
    updateOffering (updatedOffering: Offering) {
      const index = this.offerings.findIndex(
        (offering: { id: string }) => offering.id === updatedOffering.id
      )
      if (index !== -1) {
        this.offerings[index] = updatedOffering
      }
    },

    async getOfferings () {
      try {
        const response: DidServiceEndpoint | DidServiceEndpoint[] = await TbdexHttpClient.getPfiServiceEndpoint(
          'did:dht:3fkz5ssfxbriwks3iy5nwys3q5kyx64ettp9wfn1yfekfkiguj1y'
        )

        const endpoint = Array.isArray(response) ? response : [response]

        const apiRoute: string = `${endpoint}/offerings`
        const offers = await axios.get(apiRoute)
        console.log(offers)
      } catch (error) {
        console.error('Error fetching offerings:', error)
      }
    },
  },
})
