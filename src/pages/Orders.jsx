import React, {useContext, useEffect, useState} from 'react';
import Index from "../components/Card";
import axios from "axios";
import AppContext from "../context";

const Orders = () => {
    const {onAddToFavorite} = useContext(AppContext)
    const [isOrders, setIsOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get('https://639cb88016d1763ab152745f.mockapi.io/orders')
                setIsOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))

                setIsLoading(false)
            }   catch (error) {
                alert('Ошибка при запросе заказов')
                console.error(error)
            }
        })()
    }, [])

    return (
        <div className="content p-40">
            <div className='d-flex align-center justify-between mb-40'>
                <h1>Мои заказы</h1>
            </div>

            <div className="d-flex flex-wrap">
                {(isLoading
                    ? [...Array(8)]
                    : isOrders).map((item, index) => (
                    <Index
                        key={index}
                        loading={isLoading}
                        {...item}
                    />
                ))}
            </div>
        </div>
    );
};

export default Orders;