import { Button, Checkbox, Form, Input, Listbox, ListboxItem } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { addNew, AppDispatch, deleteOne, getTodos, markAsDone } from "./store/store";
import { useState } from "react";

function App() {
    const todos = useSelector(getTodos);
    const dispatch = useDispatch<AppDispatch>();
    const [currentTodo, setCurrentTodo] = useState("");

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch(addNew({ title: currentTodo, isDone: false }));
        setCurrentTodo("");
    }

    console.log(todos);

    return (
        <div className="flex w-full h-screen justify-center items-center">
            <div className="flex max-w-100 flex-col">
                <Form className="flex flex-row" onSubmit={submit}>
                    <Input value={currentTodo} onValueChange={setCurrentTodo} />
                    <Button type="submit">Add</Button>
                </Form>
                <Listbox items={todos}>
                    {(item) => {
                        return (
                            <ListboxItem
                                // classNames={{
                                //     title: "flex w-full",
                                // }}
                                key={item.id}
                            >
                                <div className="flex w-full justify-between">
                                    <Checkbox
                                        isSelected={item.isDone}
                                        onValueChange={(isSelected) =>
                                            dispatch(
                                                markAsDone({ id: item.id, isDone: isSelected }),
                                            )
                                        }
                                    />
                                    <div>{item.title}</div>
                                    <div>
                                        <Button
                                            className="min-w-4 min-h-4 w-4 h-4"
                                            onPress={() => dispatch(deleteOne(item.id))}
                                        >
                                            X
                                        </Button>
                                    </div>
                                </div>
                            </ListboxItem>
                        );
                    }}
                </Listbox>
            </div>
        </div>
    );
}

export default App;
