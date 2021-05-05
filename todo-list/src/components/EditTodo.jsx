import React, { useState } from 'react';
import todoApiService from '../api/todoApiService';

const EditTodo = (props) => {
    const { todo, onCancel, onSave } = props;
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);
    const isValid = title !== ""; //* Här kollar vi om title inte är tom 

    const handleSave = async () => {
        if(isValid && onSave) { //* Funktion för att kunna spara en uppdaterad todo. isValid finns med för att se till så att man inte kan ta bart title på en todo(man kommer inte kunna spara då) 
            const updatedTodoInfo = {...todo, title: title, description: description }; //* Spreadar todo för att få in de objekt som redan ligger där, och lägger till title och description för att det är dom vi vill kunna uppdatera 
            const updatedTodo = await todoApiService.updatedTodo(todo.id, updatedTodoInfo);  //* Hämtar updatedTodo från Api:et för att kunna uppdatera
            onSave(updatedTodo); 
        }
    }

    return (
        <form id="todo-form">
            <h2>Edit todo</h2>
            <label>Title</label>
            <input name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <label>Description</label>
            <input name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <br />
            <button type="button" className="link-button" onClick={onCancel}>Cancel</button>
            <button type="button" className="primary" onClick={handleSave} disabled={!isValid} >Save</button>  
            {/** Om isValid(title) Inte är valid(alltså om skrivfältet för title är tomt) så kommer Save knappen att bli disabled
             *  så att man inte kan trycka på den. En title behövs för att kunna lägga till en todo.*/}
        </form>
    )
}

export default EditTodo;