import React from 'react';
import Index from "../components/Card";

const Favorites = ({items, onAddToFavorite}) => {
    return (
        <div className="content p-40">
            <div className='d-flex align-center justify-between mb-40'>
                <h1>Мои закладки</h1>

            </div>

            <div className="d-flex flex-wrap">
                {items
                    .map((item, index) => (
                        <Index
                            key={index}
                            favorited={true}
                            onFavorite={onAddToFavorite}
                            {...item}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Favorites;