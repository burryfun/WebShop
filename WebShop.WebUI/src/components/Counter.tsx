import React, { useEffect, useState } from 'react';

interface counterProps {
    title: string
}

function Counter({ title }: counterProps) {

    const [count, setCount] = useState<number | 0>(0);

    // По принципу componentDidMount и componentDidUpdate:
    useEffect(() => {
        // Обновляем заголовок документа, используя API браузера
        document.title = `Вы нажали ${count} раз`;
    });

    return (
        <div>
            <p>Counter: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
};

export default Counter;