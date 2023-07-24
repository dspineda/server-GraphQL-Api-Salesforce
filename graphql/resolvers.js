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
              FirstName {
                value
              }
              LastName {
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
  console.log("🚀 ~ file: resolvers.js:48 ~ getLeads ~ LeadsResponse:", LeadsResponse)
  const Leads = LeadsResponse.map((ld) => {
    return {
      id: ld.Id,
      firstName: ld.FirstName.value,
      lastName: ld.LastName.value,
      email: ld.Email.value
    }
  })
  console.log("🚀 ~ file: resolvers.js:56 ~ Leads ~ Leads:", Leads)
  return Leads;
}

async function createLead(firstName, lastName, email) {
  
  const body = {
    firstName: firstName,
    lastName: lastName,
    email: email
  };
  const LeadResponse = await createLeadInCRM(URLREST, TOKEN, body);
  const Lead = {
    id: LeadResponse.id,
    firstName: firstName,
    lastName: lastName,
    email: email
  }
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
      const { firstName, lastName, email } = args;
      return createLead(firstName, lastName, email);
    }
  }
}







