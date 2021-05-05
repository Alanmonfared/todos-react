import React, { useState } from 'react';
import todoApiService from '../api/todoApiService';

const TodoListItem = (props) => {
    const { todo, isSelected, onClick } = props;
    const [ todos, setTodos] = useState();

    let className = "todo-list-item";  //* let className har jag nere i return kopplat till className för att få den klassen (todo-list-item)
    if (isSelected) { //* Om man klickar på en todo-list-item så vill vi lägga till ett till className, den ger todo-list-item:et som man klickat på en blå rand runt pm som visar att det är selected 
        className += " todo-list-item--selected";
    }

    const handleClick = () => { //* Gör så att man kan klicka på en todo
        if (onClick) {
            onClick(todo);
        }

    }

    let spanCheckbox = "todo-list-item__checkbox";      //* Lägger till en checkbox via className
    if (todo.completed) {                  //* om en todo är completed så vill vid lägga till en completed className på som visar tydligt att den todon är completed
        spanCheckbox += " todo-list-item__checkbox--completed";
    }

    const handleTodoCompleted = async () => {  //* En hanterare för att kunna completa och uncompleta en todo
        if (spanCheckbox) {
            const onComplete = {
                ...todo,  //* Spreadar todoerna  
                completed: todo.completed = !todo.completed
            }
            const updatedTodo = await todoApiService.updatedTodo(todo.id, onComplete);
            setTodos(updatedTodo); //* Uppdaterar todon completed
        }
    }
    return (
        <li className={className} onClick={handleClick}>
            <span onClick={handleTodoCompleted} className={spanCheckbox} >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                </svg>
            </span>

            <div className="todo-list-item__info">
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
                <p className="created-date">
                   <strong>Created Date:</strong> {new Date(todo.created).toLocaleDateString()}
                </p>
            </div>
        </li>

    )
}

export default TodoListItem;
