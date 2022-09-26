import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const baseURL = `http://10.10.23.31`
export const getTodosAsync = createAsyncThunk(
    'todos/getTodosAsync',
    async () => {
        try {
            const resp = await axios.get(`${baseURL}:8080/todos`);
            if (resp) {
                const todos = resp.data;
                return { todos };
            }
        } catch (e) {
            console.log(JSON.stringify(e));
        }
    }
);
export const addTodoAsync = createAsyncThunk(
    'todos/addTodoAsync',
    async (payload) => {
        // const resp = await fetch('http://localhost:8080/todos', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ title: payload.title }),
        // });
        try {
            const resp = await axios.post(`${baseURL}:8080/todos`, {
                title: payload.title,
                completed: payload.completed
            });
            if (resp) {
                const todo = resp.data;
                return { todo };
            }
        } catch (e) {
            console.log(JSON.stringify(e));
        }

        // if (resp.ok) {
        //     console.log("hifadf");
        //     const todo = await resp.json();
        //     return { todo };
        // }
    }
);
export const deleteTodoAsync = createAsyncThunk(
    'todos/deleteTodoAsync',
    async (payload) => {
        try {
            const resp = await axios.delete(`${baseURL}:8080/todos/${payload.id}`);
            if (resp) {
                return { id: payload.id };
            }
        } catch (e) {
            console.log(JSON.stringify(e));
        }
    }
);

export const updateTodoAsync = createAsyncThunk(
    'todos/updateTodoAsync',
    async (payload) => {
        try {
            const resp = await axios.patch(`${baseURL}:8080/todos/${payload.id}`, {
                title: payload.title,
                completed: payload.completed,
            });
            if (resp) {
                const todo = resp.data;
                // console.log(todo);
                return { todo };
            }
        } catch (e) {
            console.log(JSON.stringify(e));
        }

        // const resp = await fetch(`http://localhost:8080/todos/${payload.id}`, {
        //     method: 'PATCH',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ title: payload.title }),
        // });

        // if (resp.ok) {
        //     const todo = await resp.json();
        //     return { todo };
        // }
    }
);

export const todoSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: action.payload.id,
                title: action.payload.title,
                completed: false,
            };
            state.push(todo);
        },
        updateTodo: (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id);
            state[index].title = action.payload.title;
            state[index].completed = action.payload.completed;
        },
        deleteTodo: (state, action) => {
            return state.filter((todo) => todo.id !== action.payload.id);
        },

    },
    extraReducers: {
        [getTodosAsync.fulfilled]: (state, action) => {
            return action.payload.todos;
        },
        [addTodoAsync.fulfilled]: (state, action) => {
            state.push(action.payload.todo);
        },
        [updateTodoAsync.fulfilled]: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.id === action.payload.todo.id
            );
            state[index].title = action.payload.todo.title;
            state[index].completed = action.payload.todo.completed;
            // console.log(state[index].completed);
            // console.log(state[index].title);
        },
        [deleteTodoAsync.fulfilled]: (state, action) => {
            return state.filter((todo) => todo.id !== action.payload.id);
        },
    },
});


export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;