import React, { memo, useContext } from 'react';
import TodoItem from './TodoItem';
import { TodoContext } from '../contexts/TodoContext';

const TodoList = () => {
    const { todos, refetch } = useContext(TodoContext);

    return (
        <div className="mt-2 actions flex flex-col gap-1 w-72">
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} refetch={refetch} />
            ))}
        </div>
    );
};

export default memo(TodoList);
