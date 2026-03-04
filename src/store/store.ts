import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { selectors } from "./selectors";

export interface Todo {
    id: number;
    title: string;
    isDone: boolean;
}

export interface InitialState {
    todos: Todo[];
}

const initialState: InitialState = {
    todos: [],
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    selectors,
    reducers: {
        addNew(state, action: PayloadAction<Partial<Todo>>) {
            const todo = {
                id: state.todos.length + 1,
                title: "",
                isDone: false,
                ...action.payload,
            };
            state.todos.push(todo);
        },
        deleteOne(state, action: PayloadAction<number>) {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
        clearAll(state) {
            state.todos = [];
        },
        markAsDone(state, action: PayloadAction<{ id: number; isDone: boolean }>) {
            state.todos = state.todos.map((todo) => {
                if (todo.id === action.payload.id) {
                    return { ...todo, isDone: action.payload.isDone };
                }
                return todo;
            });
        },
    },
});

export const { addNew, deleteOne, clearAll,markAsDone } = todoSlice.actions;

export const store = configureStore({
    reducer: { todo: todoSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const { getTodos } = todoSlice.selectors;
