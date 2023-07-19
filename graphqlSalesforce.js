export async function searchContactsCRM(url, token, query){
  console.log("🚀 ~ file: graphqlSalesforce.js:2 ~ searchContactsCRM ~ query:", query)
  console.log("🚀 ~ file: graphqlSalesforce.js:2 ~ searchContactsCRM ~ token:", token)
  console.log("🚀 ~ file: graphqlSalesforce.js:2 ~ searchContactsCRM ~ url:", url)
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({query})
    })
    console.log("🚀 ~ file: graphqlSalesforce.js:14 ~ searchContactsCRM ~ response:", response)

      if(!response.ok){
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log("🚀 ~ file: graphqlSalesforce.js:21 ~ searchContactsCRM ~ data:", data)
      return data;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  }
}