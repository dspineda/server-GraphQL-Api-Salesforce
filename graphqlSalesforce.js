export async function searchLeadsCRM(url, token, query){
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': `application/json`,
        'Authorization': `Bearer ${token}`
      },
      body: `${JSON.stringify(query)}`
    })

      if(!response.ok){
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const leads = data.data.uiapi.query.Lead.edges.map((edge) => edge.node);
      return leads;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  }
}

export async function createLeadInCRM(url, token, body){
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': `application/json`,
        'Authorization': `Bearer ${token}`
      },
      body: `${JSON.stringify(body)}`
    })
      if(!response.ok){
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  }

}