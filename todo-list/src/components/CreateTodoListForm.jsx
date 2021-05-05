import React, { useState } from 'react';
import todoApiService from '../api/todoApiService';

const CreateTodoListForm = (props) => {
    const { onCancel, onSave } = props;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const isValid = title !== "";

    const handleSave = async () => {
        if (isValid && onSave) {        //* Hanterar vad som ska hända när man trycker på save knappen så att en ny todo läggs till.                             
            const newTodo = {          //* Här säger vi att den nya todon som läggs till ska ha en få en title och description som blir synligt.
                title: title,
                description: description
            };
            const createdTodo = await todoApiService.createTodo(newTodo);   //* Hämtar createTodo från apiServicen som för att todon automatiskt får resten av dens egenskaper som behövs, som id osv.
            setTitle("");        //* Sätter inputen för title och description till null(empty) 
            setDescription("");
            onSave(createdTodo); //* Säger att när vi trycker på save så vill vi visa todo som vi nyss skapat(vi kommer hamna i todoDetails vyn(edit))
        }
    };


    return (
        <form id="todo-form">
            <h2>Add a new todo</h2>
            <label>Title</label>
            <input name="title" value={title} onChange={(e) => setTitle(e.target.value)} /> {/* onChange med event gör så att vi kan skriva i inputen, samma lika för description */}
            <label>Description</label>
            <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} >Todo Description</textarea>
            <br />
            <button type="button" className="link-button" onClick={onCancel}> Cancel </button>
            <button type="button" className="primary" onClick={handleSave} disabled={!isValid}  >Save</button>
        </form>
    );
}

export default CreateTodoListForm;