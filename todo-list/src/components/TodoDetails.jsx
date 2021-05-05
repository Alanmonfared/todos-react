import React from 'react';
import todoApiService from '../api/todoApiService';

const TodoDetails = (props) => {
    const { todo, onEdit, onDelete } = props;

    const handleDelete = async () => {
        const confirmationResult = window.confirm(`Do you really want to delete ${todo.title}?`);

        if (confirmationResult) {
            const deletedTodo = await todoApiService.deleteTodo(todo.id);   //* Med hjälp av deleteTodo från Api:et så kan man ta bort todo vid positivt(true) svar från window.confirm
            onDelete(deletedTodo); 
        }
    }

    return (
        <div className="todo-details">
            <h2>{todo.title}</h2>       {/** Skickas in från props */}
            <p>{todo.description}</p>
            <p name="createTodoDate" className="todo-details__date">         {/* När en todo skapas så kommer en tid och datum att sättas */}
                <strong>Created Date:</strong> {new Date(todo.created).toLocaleDateString()}
                <br />
                <strong>Created Time:</strong> {new Date(todo.created).toLocaleTimeString()}
            </p>
            <p name="updatedTodoDate" className="todo-details__date" hidden={!todo.updated}>   {/* När en todo uppdateras så kommer en tid och datum att sättas */}
                <strong>Updated Date:</strong> {new Date(todo.updated).toLocaleDateString()}    {/* har satt hela p taggen/blocket till en hidden som gör att "Updated Date:" & "Update Time:" inte syns om todon inte har uppdaterats */}
                <br />
                <strong>Updated Time:</strong> {new Date(todo.updated).toLocaleTimeString()}
            </p>
            <button type="button" className="link-button danger" onClick={handleDelete}>Delete</button>
            <button type="button" className="link-button" onClick={onEdit} >Edit</button>
        </div>
    );
}

export default TodoDetails;