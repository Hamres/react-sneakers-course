import React, {useEffect, useState} from 'react';
import Index from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer"
import axios from "axios";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

const App = () => {
    const [items, setItems] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [favorites, setFavorites] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [cartOpened, setCartOpened] = useState(false)

    useEffect(() => {
        axios.get('https://639cb88016d1763ab152745f.mockapi.io/items').then(res => {
            setItems(res.data)
        })
        axios.get('https://639cb88016d1763ab152745f.mockapi.io/cart').then(res => {
            setCartItems(res.data)
        })
        axios.get('https://639cb88016d1763ab152745f.mockapi.io/favorites').then(res => {
            setFavorites(res.data)
        })
    }, [])

    const onAddToCart = (obj) => {
        axios.post('https://639cb88016d1763ab152745f.mockapi.io/cart', obj)
        setCartItems((prev) => [...prev, obj])
    }

    const onRemoveItem = (id) => {
        axios.delete(`https://639cb88016d1763ab152745f.mockapi.io/cart/${id}`)
        setCartItems((prev) => prev.filter(item => item.id !== id))
    }

    const onAddToFavorite = async (obj) => {
        try {
            if(favorites.find(favObj => favObj.id === obj.id)) {
                axios.delete(`https://639cb88016d1763ab152745f.mockapi.io/favorites/${obj.id}`)
                setFavorites((prev) => prev.filter(item => item.id !== obj.id))
            } else {
                const {data} = await axios.post('https://639cb88016d1763ab152745f.mockapi.io/favorites', obj)
                setFavorites((prev) => [...prev, data])
            }
        } catch (error) {
            alert('Не удалось добавить в избранное')
        }
    }

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value)
    }


    return (
        <div className='wrapper clear'>
            {cartOpened && <Drawer
                items={cartItems}
                onClose={() => setCartOpened(false)}
                onRemove={onRemoveItem}
            />}
            <Header
                onClickCart={() => setCartOpened(true)}
            />

            <Routes>
                <Route
                    path='/'
                    exact
                    element={<Home
                        items={items}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        onAddToFavorite={onAddToFavorite}
                        onAddToCart={onAddToCart}
                        onChangeSearchInput={onChangeSearchInput}
                        />
                    }
                />
                <Route
                    exact
                    path='/favorites'
                    element={
                    <Favorites
                        items={favorites}
                        onAddToFavorite={onAddToFavorite}
                    />}
                />
            </Routes>
        </div>
    );
};

export default App;