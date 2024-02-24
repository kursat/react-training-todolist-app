import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';

const TodoSampleRequest = () => {
    const [todos, setTodos] = useState([]);
    const [isFetched, setIsFetched] = useState(false);

    useEffect(() => {
        if (!isFetched) {
            fetch('http://localhost:3001/todos', {
                method: 'GET',
                headers: {},
            })
                .then((response) => response.json())
                .then((result) => {
                    setTodos(result);
                    setIsFetched(true);
                });
        }
        return () => {};
    }, [isFetched]);

    const onClickAddNew = () => {
        fetch('http://localhost:3001/todos', {
            method: 'POST',
            headers: {},
            body: JSON.stringify({
                id: Math.random(),
                text: 'New todo',
                checked: false,
            }),
        }).then(() => {
            setIsFetched(false);
        });
    };

    return (
        <div>
            {todos.map((todo) => (
                <li key={todo.id}>{todo.text}</li>
            ))}

            <Button onClick={onClickAddNew}>Add New</Button>
        </div>
    );
};

export default TodoSampleRequest;
