import { searchLeadsCRM, createLeadInCRM } from '../graphqlSalesforce.js';
import dotenv from 'dotenv';
dotenv.config();


const URLGRAPHQL = process.env.URLGRAPHQL;
const URLREST = process.env.URLREST;
const TOKEN = process.env.TOKEN;
const query = {
  query: `
  query leads {
    uiapi {
      query {
        Lead (first:5){
          edges {
            node {
              Id
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
  const LeadsResponse = await searchLeadsCRM(URLGRAPHQL, TOKEN, query);
  const Leads = LeadsResponse.map((ld) => {
    return {
      id: ld.Id,
      name: ld.Name.value,
      email: ld.Email.value
    }
  })
  return Leads;
}

async function createLead(name, email) {
  
  const body = {
    firstName: name,
    lastName: name,
    email: email
  };
  const LeadResponse = await createLeadInCRM(URLREST, TOKEN, body);
  const Lead = {
    id: LeadResponse.id,
    name: name,
    email: email
  }
  console.log("🚀 ~ file: resolvers.js:72 ~ createLead ~ Lead:", Lead)
  return Lead;
}


export const resolvers = {
  Query: {
    availableProperties: async (_, args) => {
      return properties.filter(property => property.available)
    },
    leads: async () => {
      return getLeads();
    }
  },

  Mutation: {
    createLead: async (_, args) => {
      const { name, email } = args;
      return createLead(name, email);
    }
  }
}







