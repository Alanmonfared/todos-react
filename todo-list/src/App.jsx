
import React, { useEffect, useState } from 'react';
import './App.css';
import todoApiService from './api/todoApiService';

// Importing components
import TodoList from './components/TodoList';
import TodoDetails from './components/TodoDetails';
import EditTodo from './components/EditTodo';
import CreateTodoListForm from './components/CreateTodoListForm';

const viewModes = {
  view: "View",         //* Vyerna, hämtas via viewModes tex (viewModes.view)
  edit: "Edit",
  create: "Create",
};

function App() {
  const [todo, setTodo] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState();
  const [viewMode, setViewMode] = useState(viewModes.create);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  
  useEffect(() => {
    const filterHandler = () => {
      switch (status) {
        case "completed":
          setFilteredTodos(todo.filter((todos) => todos.completed === true));
          break;
        case "uncompleted":
          setFilteredTodos(todo.filter((todos) => todos.completed === false));
          break;
        case "created":
          setFilteredTodos(todo.filter((todos) => todos.updated === todo.created));
          break;
        case "updated":
          setFilteredTodos(todo.filter((todos) => todos.updated === todo.created));
          break;
        case "oldToNew":
          setFilteredTodos(todo.filter((todos) => todos.updated === todo.created));
          break;
        case "newToOld":
          setFilteredTodos(todo.filter((todos) => todos.updated === todo.created));
          break;
        default:
          setFilteredTodos(todo);
          break;


        //* Här byggt upp en hanterar som ger en möjlighet till att välja hur man vill visa todoerna. Man kan välja att se alla, completed eller uncompleted todos
        //* Tanken var att jag skulle fixa så att man får möjligheten att också kunna välja efter när en todo har skapats eller uppdaterats och sedan fallande och stigande ordning.
        //* MEN jag har inte lyckas att koppla det på rätt sätt, jag vet inte hur jag skriva det och har försökt googla men har inte lyckats hitta det jag söker.
        //* Eftersom att created och updated osv inte returnera ett true eller false statement som completed gör så kan jag inte koppla det på samma sätt, har testat flera olika saker men inte lyckats.
        //* Även fast att jag inte lyckats koppla de på rätt sätt så har jag valt att låta de vara kvar så får du iaf se hur långt jag lyckats.

      }
    }
    filterHandler();
  }, [todo, status]);

  const statusHandler = (e) => {  //* Status hanterare till filterHandler()
    setStatus(e.target.value);
  }

  const showCreateForm = () => {
    setSelectedTodo(null);
    setViewMode(viewModes.create); //* Gör så att todon som är selected avmarkeras när man går till create vyn för att lägg till en ny todo
  }

  const selectTodo = (todo) => {
    setSelectedTodo(todo);        //* Fixar så att det går att selecta en todo och sätter view mode till view(todoDetails)
    setViewMode(viewModes.view);
  }

  const handleNewTodo = (newTodo) => {
    const newArray = [...todo, newTodo]; //* newArray är en ny array som är baserad på todo. Spreadar todo för att få in de objekt som redan ligger där.
    setTodo(newArray);                   //* Sätter todo till newArray för att få in de nya objektet
    selectTodo(newTodo);                  //* Gör så att den nya todon som skapas blir selected
  }

  const handleTodoUpdated = (updatedTodo) => {
    const newArray = todo.slice();                //* Här görs en kopia av arrayen 
    for (var i = 0; i < newArray.length; i++) {
      if (newArray[i].id === updatedTodo.id) {
        newArray[i] = updatedTodo;              //* Här så ersätts den nuvarande todon med den uppdaterade todon
        break;    //* Break skrivs så att så att vi kan hoppa ur listan när todon i funnen, annars går det bara runt och runt och runt
      }
    }
    setTodo(newArray);         //* Uppdaterar todos 
    selectTodo(updatedTodo);  //* Uppdaterar vilken todo som är selected 
  }


  const handleTodoCompleted = (id) => {
    const updatedTodos = [...todo].map((todos) => {
      if (todos.id === id) {
          todos.completed = !todos.completed
        }
        return todos;
    })
      setTodo(updatedTodos);
}
 



  const handleTodoDeleted = (deletedTodo) => {
    setTodo(todo.filter(todo => todo.id !== deletedTodo.id))   //* Kollar först att todons id inter är samma id som deletedTodons id. Gör så att man kan ta bort en todo
    showCreateForm(); //* Sätter vyn till create 
  }

  const getTodo = async () => {
    const todo = await todoApiService.getTodos(); //* här hämtar man en todo (fecthar) från api service
    setTodo(todo);
  }

  useEffect(() => {
    getTodo(); //* Här hämtat todos upp och sparas i en lista (array) och körs bara vid start eller när beroenderna i listan ändras 

  }, []);


  const renderMainSection = () => {
    if (!selectedTodo || viewMode === viewModes.create) {
      return (
        <CreateTodoListForm
          onCancel={() => setViewMode(viewModes.view)} onSave={handleNewTodo}
        /> //* Om ingen todo är selected eller viewMode är lika med viewModes.create så kommer createTodoListForm att retuneras.
      );
    }
    switch (viewMode) {
      case viewModes.view:
        return (
          <TodoDetails
            todo={selectedTodo} onDelete={handleTodoDeleted} onEdit={() => setViewMode(viewModes.edit)}
          />
        );
      case viewModes.edit:
        return (
          <EditTodo
            todo={selectedTodo} onCancel={() => setViewMode(viewModes.view)} onSave={handleTodoUpdated}
          />
        );
      default:
        return null;
    }

  };

  return (
    <main>
      <aside>
        <h1 className="list-title">
          My Todos
          <button id="button-add-todo"
            className="primary"
            onClick={showCreateForm} >
            Add
          </button>
        </h1>
        <p className="sort-by">Sort by</p>
        <select onChange={statusHandler} name="todos" className="filter-todo">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
          <option value="created">Created</option>
          <option value="updated">Updated</option>
          <option value="oldToNew">Oldest to newest</option>
          <option value="newToOld">Newest to oldest</option>
        </select>

        <TodoList todo={todo}
          selectedTodo={selectedTodo}
          onTodoSelected={selectTodo}
          setStatus={setStatus}
          filteredTodos={filteredTodos}
          onComplete={handleTodoCompleted}
        />
      </aside>
      <section>
        {renderMainSection()}
      </section>
    </main>
  );
}

export default App;
