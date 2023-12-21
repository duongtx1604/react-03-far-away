export default function App() {
    return (
        <div className="app">
            <Logo></Logo>
            <Form></Form>
            <PackingList></PackingList>
            <Starts></Starts>
        </div>
    );
}
function Logo() {
    return <h1>🌍 Far Away 👜</h1>;
}
function Form() {
    return (
        <div className="add-form">
            <h3>What do you need for your trip?</h3>
        </div>
    );
}
function PackingList() {
    return <div className="list">LIST</div>;
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
