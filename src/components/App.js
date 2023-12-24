import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Starts from "./Stats";

const initialItems = [
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 4, packed: false },
    { id: 3, description: "Charger", quantity: 1, packed: false },
    { id: 4, description: "Ipad", quantity: 1, packed: true },
    { id: 5, description: "Apple Watch", quantity: 2, packed: false },
];

export default function App() {
    const [items, setItems] = useState(initialItems);

    function clearItems() {
        const confirmed = window.confirm(
            "Are you sure you want to delete all items?"
        );
        if (confirmed) setItems([]);
    }
    function handleAddItem(item) {
        setItems((items) => [...items, item]);
    }
    function handleDeleteItem(id) {
        setItems((items) => items.filter((item) => item.id !== id));
    }
    function handlePacked(id) {
        setItems((items) =>
            items.map((item) =>
                item.id === id ? { ...item, packed: !item.packed } : item
            )
        );
    }
    return (
        <div className="app">
            <Logo></Logo>
            <Form onAddItems={handleAddItem}></Form>
            <PackingList
                items={items}
                onDeleteItem={handleDeleteItem}
                onPacked={handlePacked}
                clearItems={clearItems}
            ></PackingList>
            <Starts items={items}></Starts>
        </div>
    );
}
