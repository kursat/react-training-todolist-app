import React, { useContext, lazy, useState, Suspense } from 'react';
import FilterActions from './components/FilterActions';
import TodoEditor from './components/TodoEditor';
import TodoList from './components/TodoList';
import { Button, CircularProgress } from '@nextui-org/react';
import { TodoContext } from './contexts/TodoContext';

const TodosContainer = lazy(
    () =>
        import(/* webpackChunkName: "todos" */ './components/TodosContainer.js')
);

function TodoApp() {
    const [isVisible, setIsVisible] = useState(false);

    const context = useContext(TodoContext);

    if (!context) {
        throw new Error('TodoApp sadece TodoContext içerisinde kullanılabilir');
    }

    return (
        <div className="App">
            <Button onClick={() => setIsVisible(!isVisible)}>
                Show/Hide App
            </Button>
            {isVisible && (
                <Suspense fallback={<CircularProgress />}>
                    <TodosContainer>
                        {context.isFetching ? (
                            <CircularProgress />
                        ) : (
                            <TodoList />
                        )}

                        <TodoEditor />
                        <FilterActions />
                    </TodosContainer>
                </Suspense>
            )}
        </div>
    );
}

export default TodoApp;
