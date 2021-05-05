/*
    Vi ska skapa en api-service som kommunicerar med api:et i todoListApi
    Följ instruktionerna i readme för att få igång api:et

    När api:et är igång kan du bygga klart funktionerna för att todo-api-servicen ska fungera.
    getTodos är redan implementerad som exempel.

    Använd fetch() för att hämta data

    För POST och PUT, behöver följande header anges för att JSON ska fungera:
    headers: 
    {
        "Content-Type": "application/json",
    },

*/
function createTodoApiService() {
  const apiAddress = "http://localhost:3001";

  return {
    getTodos: async () => {
      // GET api/todo
      const response = await fetch(`${apiAddress}/todo`);
      if (response.ok) {
        const result = await response.json();
        return result;
      }
      throw new Error({
        status: response.status,
        statusText: response.statusText,
      });
    },
    getTodo: async (id) => {
      // GET api/todo/:id
      const response = await fetch(`${apiAddress}/todo/${id}`);
      if (response.ok) {
        const result = await response.json();
        return result;
      }
      throw new Error({
        status: response.status,
        statusText: response.statusText,
      });
    },
    createTodo: async (newTodo) => {
      const response = await fetch(`${apiAddress}/todo`, {
        method: 'POST',
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify(newTodo)
      });
      if (response.ok) {
        const result = await response.json();
        return result;
      }
      throw new Error({
        status: response.status,
        statusText: response.statusText,
      });
    },
    updatedTodo: async (id, updatedTodo) => {
      /* PUT api/todo/:id
             body:
             {
                 id:string,
                 title:string,
                 description:string (optional),
                 completed:boolean
             }
      */
     const response = await fetch(`${apiAddress}/todo/${id}`, {
       method: 'PUT',
       headers: { 
         'content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTodo)
     });
     if (response.ok) {
      const result = await response.json();
      return result;
    }
    throw new Error({
      status: response.status,
      statusText: response.statusText,
    });
    },
    deleteTodo: async (id) => {
      // DELETE api/todo
      const response = await fetch(`${apiAddress}/todo/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const result = await response.json();
        return result;
      }
      throw new Error({
        status: response.status,
        statusText: response.statusText,
      });
    },
  };
}

export default createTodoApiService();