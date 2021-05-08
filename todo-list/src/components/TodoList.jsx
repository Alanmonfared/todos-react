import React from 'react';

// Importing components
import TodoListItem from '../components/TodoListItem';


const TodoList = (props) => {
    const { selectedTodo, filteredTodos, sortedTodos } = props;

    const handleTodoClicked = (todo) => {
        if (props.onTodoSelected) {         //* Hanterar så att man kan markera en todo
            props.onTodoSelected(todo);
        }
    }


    return (
        <div>
            <ul className="todo-list">
                {filteredTodos.map((todo) => (   
                    <TodoListItem
                        onClick={handleTodoClicked}
                        key={todo.id}
                        todo={todo}
                        isSelected={todo === selectedTodo}
                        onComplete={onComplete}
                    />
                ))}
            </ul>
        </div>

        //* Map är en arrayfunktion i React som i detta fall retunerar en todo per antalet todos som finns i listan.
        //* För varje todo som finns i TodoList så kommer ett TodoListItem att läggas till  

        //* Istället för att mappa todo så mappar jag filterTodos som jag hämtar i från props. Detta gör så att det kopplas till filterHandler functionen i App.js via State.
        //* Vilket gör att man får fram det alternativet man valt(tex om du väljer att bara se completed todos, så kommer det att uppdateras i webbläseren så att du gör det.)
    )

}

export default TodoList;