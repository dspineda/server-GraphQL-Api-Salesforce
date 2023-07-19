import { searchContactsCRM } from '../graphqlSalesforce.js';
import dotenv from 'dotenv';
dotenv.config();



const URL = process.env.URL;
const TOKEN = process.env.TOKEN;
const query = {
  query: `
  query contacts {
    uiapi {
      query {
        Contact {
          edges {
            node {
              Name {
                value
              }
            }
          }
        }
      }
    }
  }`,
}



async function getContacts(){
  const data = await searchContactsCRM(URL, TOKEN, query);
  console.log("🚀 ~ file: resolvers.js:27 ~ getContacts ~ data:", data)
  return data.uiapi.query.Contact.edges.map(edge => edge.node.Name.value);
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

export const resolvers = {
  Query: {
    availableProperties: async (_, args) => {
      return properties.filter(property => property.available)
    },
    contacts: async () => {
      return getContacts();
    }
  }
}





