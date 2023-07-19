import { searchLeadsCRM } from '../graphqlSalesforce.js';
import dotenv from 'dotenv';
dotenv.config();


const URL = process.env.URL;
const TOKEN = process.env.TOKEN;
const query = {
  query: `
  query leads {
    uiapi {
      query {
        Lead (first:5){
          edges {
            node {
              Name {
                value
              }
              Email {
                value
              }
            }
          }
        }
      }
    }
  }`,
}

const properties = [
  {
    description: 'A beautiful house',
    address:{
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zip: '94101'
    },
    available: true,
  }
]




async function getLeads() {
  const LeadsResponse = await searchLeadsCRM(URL, TOKEN, query);
  const Leads = LeadsResponse.map((contact) => {
    return {
      name: contact.Name.value,
      email: contact.Email.value
    }
  })
  return Leads;
}

export const resolvers = {
  Query: {
    availableProperties: async (_, args) => {
      return properties.filter(property => property.available)
    },
    leads: async () => {
      return getLeads();
    }
  }
}





