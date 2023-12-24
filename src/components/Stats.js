export default function Starts({ items }) {
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
