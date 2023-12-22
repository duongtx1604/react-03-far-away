import { useState } from "react";

const initialItems = [
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: false },
    { id: 3, description: "Charger", quantity: 12, packed: false },
    { id: 4, description: "Book", quantity: 12, packed: true },
    { id: 5, description: "Apple", quantity: 12, packed: false },
    { id: 6, description: "Tivi", quantity: 12, packed: true },
];

export default function App() {
    const [items, setItems] = useState(initialItems);

    function handleAddItem(item) {
        setItems((items) => [...items, item]);
    }
    function handlePacked(id) {
        setItems((items) =>
            items.map((item) => item.id === id && !item.packed)
        );
    }
    function handleDeleteItem(id) {
        setItems((items) => items.filter((item) => item.id !== id));
    }
    return (
        <div className="app">
            <Logo></Logo>
            <Form onAddItems={handleAddItem}></Form>
            <PackingList
                items={items}
                onDeleteItem={handleDeleteItem}
                onPacked={handlePacked}
            ></PackingList>
            <Starts></Starts>
        </div>
    );
}
function Logo() {
    return <h1>🌍 Far Away 👜</h1>;
}
function Form({ onAddItems }) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);

    function handleSubmit(e) {
        e.preventDefault();
        if (!description) return;
        const newItem = {
            id: Date.now(),
            description,
            quantity,
            package: false,
        };
        // console.log(newItem);
        onAddItems(newItem);
        // console.log(items);

        setDescription("");
        setQuantity(1);
    }
    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your trip?</h3>
            <select
                onChange={(e) => {
                    setQuantity(+e.target.value);
                }}
                value={quantity}
            >
                {Array.from({ length: 20 }, (_, i) => (
                    <option value={i + 1} key={i + 1}>
                        {i + 1}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Item..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button>Add</button>
        </form>
    );
}
function PackingList({ items, onDeleteItem, onPacked }) {
    return (
        <div className="list">
            <ul>
                {items.map((item) => (
                    <Item
                        item={item}
                        key={item.id}
                        onDeleteItem={onDeleteItem}
                        onPacked={onPacked}
                    />
                ))}
            </ul>
        </div>
    );
}
function Item({ item, onDeleteItem, onPacked }) {
    return (
        <li>
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
                {/* <input type="checkbox" onChange={() => onPacked(item.id)} /> */}
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
        </li>
    );
}

function Starts() {
    return (
        <footer className="stats">
            <em>
                You have X items on your list, and you already packed X (X%)
            </em>
        </footer>
    );
}
