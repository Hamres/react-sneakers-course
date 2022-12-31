import React, {useContext, useState} from 'react';
import styles from './Card.module.scss'
import ContentLoader from "react-content-loader"
import AppContext from "../../context";

const Index = ({
                   id,
                   title,
                   imageUrl,
                   price,
                   onFavorite,
                   onPlus,
                   favorited = false,
                   loading = false
}) => {
    const {isItemAdded} = useContext(AppContext)
    const [isFavorite, setIsFavorite] = useState(favorited)
    const obj = { id, parentId: id, title, imageUrl, price }

    const onClickPlus = () => {
        onPlus(obj)
    }


    const onClickFavorite = () => {
        onFavorite(obj)
        setIsFavorite(!isFavorite)
    }

    return (
        <div className={styles.card}>
            {loading
                    ? <ContentLoader
                        speed={2}
                        width={230}
                        height={230}
                        viewBox="10 0 235 265"
                        backgroundColor="#f0ebeb"
                        foregroundColor="#d6d1d1"
                    >
                        <rect x="15" y="0" rx="10" ry="10" width="145" height="155"/>
                        <rect x="15" y="167" rx="5" ry="5" width="155" height="15"/>
                        <rect x="15" y="191" rx="5" ry="5" width="100" height="15"/>
                        <rect x="5" y="234" rx="5" ry="5" width="80" height="25"/>
                        <rect x="130" y="230" rx="10" ry="10" width="35" height="35"/>
                    </ContentLoader>
                    :
                    <>
                        {onFavorite &&
                            <div className={styles.favorite} onClick={onClickFavorite}>
                                <img src={isFavorite ? 'img/liked.svg' : 'img/unliked.svg'} alt="Unliked"/>
                            </div>}
                        <img width='100%' height={135} src={imageUrl} alt="Sneakers"/>
                        <h5>{title}</h5>
                        <div className='d-flex justify-between align-center'>
                            <div className='d-flex flex-column'>
                                <span>Цена:</span>
                                <b>{price} руб.</b>
                            </div>
                            {onPlus && <img
                                className={styles.plus}
                                onClick={onClickPlus}
                                src={isItemAdded(id)
                                    ? 'img/btn-checked.svg'
                                    : 'img/plus.svg'
                                }
                                alt="Plus"
                            />}
                        </div>
                    </>
            }
        </div>
    )
};

export default Index;