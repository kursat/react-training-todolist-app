import { useEffect, useState } from 'react';

const useTodos = () => {
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

    return {
        todos,
        setIsFetched,
    };
};

export default useTodos;
