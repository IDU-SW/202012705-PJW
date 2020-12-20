import './App.css'
import React, { useState, useRef, useCallback } from 'react';

function TodoList({ todos, remove, success }) {
    const ulStyle = {

    }
    return (
        <ul style={{
            listStyle:"none"    // ul 점 삭제
            // width:"300px",marginLeft:"auto", marginRight:"auto" // ul 점 가운데 정렬
        }}>
            {todos.map(item => (
                <li key={item.id}>
                    <input type="checkbox" checked={item.done} onChange={() => success(item.id)} /> <div className = {item.done?'finish':'text'}> {item.text} </div> <button onClick={()=> remove(item.id)}>삭제</button>
                </li>
            ))
            }
        </ul>
    )
}

function TodoHeader({ todos }) {
    return (
        <center><h3>오늘의 할 일 목록 ( {todos.filter(item => !item.done).length} / {todos.length})</h3></center>
    )
}

function NewTodoForm({ addTodo }) {
    let [todo, setTodo] = useState('');
    const input = useRef(null);

    const onChange = useCallback(e => {
        setTodo(e.target.value)
    });

    const onClick = useCallback(e => {
        e.preventDefault();
        addTodo(todo);
        setTodo('');
        input.current.focus();
    }, [addTodo, todo]);

    return (
        <div>
            <form onSubmit={onClick}>
                <div className='plus'><input placeholder='할일을 입력하세요.' onChange={onChange} value={todo} ref={input} /></div>
                <input type='submit' value='추가' />
            </form>
        </div>
    )
}

function App() {
    let [todos, setTodos] = useState([
        { id: 1, text: 'study react.js', done: false },
        { id: 2, text: 'study ReactNative', done: false },
        { id: 3, text: 'study node.js', done: true }
    ]);
    const nextId = useRef(4);

    const handleTodoAdd = useCallback(contents => {
        const todo = {
            id: nextId.current,
            text: contents,
            done: false
        };
        setTodos(todos => todos.concat(todo));
        nextId.current += 1;
        console.log('addTodo works :', contents);
    }, [])

    const remove = useCallback(id => {
        setTodos(todos.filter(todo => todo.id !== id))
    }, [todos]);

    const success = useCallback(id => {
        setTodos(todos.map(todo => todo.id !== id ? todo : { ...todo, done: !todo.done })
        )
    }, [todos]);

    return (
        <center>
        <div>
            <TodoHeader todos={todos} />
            <TodoList todos={todos} remove={remove} success={success} />
            <NewTodoForm addTodo={handleTodoAdd} />
        </div>
        </center>
    );
}

export default App;
