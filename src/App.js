import { useState } from "react";

const initialItems = [
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: false },
    { id: 3, description: "Charger", quantity: 12, packed: false },
    { id: 4, description: "Book", quantity: 12, packed: true },
    { id: 5, description: "Apple", quantity: 12, packed: false },
];

export default function App() {
    const [items, setItems] = useState(initialItems);

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
            ></PackingList>
            <Starts items={items}></Starts>
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
        onAddItems(newItem);

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
            <input
                type="checkbox"
                value={item.packed}
                onChange={() => onPacked(item.id)}
                checked={item.packed === true && "checked"}
            />
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
        </li>
    );
}

function Starts({ items }) {
    if (!items.length)
        return (
            <footer className="stats">
                <em>Start adding some items to your packing list...</em>
            </footer>
        );

    const numItems = items.length;
    const packed = items.filter((item) => item.packed).length;
    const per = Math.round((packed / numItems) * 100);
    return (
        <footer className="stats">
            <em>
                {per === 100
                    ? "You got everything! Ready to go ✈️✈️"
                    : `You have ${numItems} items on your list, and you already packed ${packed} (${per}%)`}
            </em>
        </footer>
    );
}
