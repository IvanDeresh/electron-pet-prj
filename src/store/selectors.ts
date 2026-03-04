import type { InitialState } from "./store";

export const selectors = {
    getTodos: (state: InitialState) => state.todos,
};
