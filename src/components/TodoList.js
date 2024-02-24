import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, setIsFetched, onClickUpdateTodoItem }) => {
    return (
        <div className="mt-2 actions flex flex-col gap-1 w-72">
            {todos.map((todo, index) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    setIsFetched={setIsFetched}
                    onClickUpdateTodoItem={onClickUpdateTodoItem}
                />
            ))}
        </div>
    );
};

export default TodoList;
