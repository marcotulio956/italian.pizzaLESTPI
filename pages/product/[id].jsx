import styles from "../../styles/Product.module.css";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

const Product = ({ product }) => {
    const price = product.price.toFixed(2);
    const [quantity, setQuantity] = useState(1);
    const [extraOption, setValue] = useState(product.extraOptions[0]);
    const id = product._id
    const [showFeedbackMsg, setFeedbackMsg] = useState(false)

    const FeedbackMsg = () => (
        <div id="feedback"> Item adicionado ao carrinho</div>
    )

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(addProduct({ ...product, id, extraOption, price, quantity }));
        
        setFeedbackMsg(true)
        setTimeout(() => {
            setFeedbackMsg(false);
        }, 1500);
    };

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.imgContainer}>
                    <Image src={product.image} objectFit="contain" layout="fill" alt="" />
                </div>
            </div>
            <div className={styles.header}></div>
            <div className={styles.right}>
                <h1 className={styles.title}>{product.title}</h1>
                <span className={styles.price}>R$ {product.price.toFixed(2)}</span>
                <p className={styles.description}>{product.description}</p>

                <h3 className={styles.choose}>Opções extras:</h3>
                <div className={styles.selectWrapper}>
                    <select onChange={(e) => {setValue(e.target.value)}} name="options" id={styles.options}>
                        {product.extraOptions.map((option, index) => {
                            return (
                                <option key={index} value={option}>{option}</option>
                            )
                        })}
                    </select>
                </div>

                <div className={styles.add}>
                    <input onChange={(e) => setQuantity(e.target.value)} type="number" min="1" defaultValue={1} className={styles.quantity} />
                    <button className={styles.button} onClick={handleClick}>Adicionar no carrinho</button>
                    {showFeedbackMsg ? <FeedbackMsg /> : null}
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps = async ({ params }) => {
    const res = await axios.get(
        `https://italian-pizza-iota.vercel.app/api/products/${params.id}`
    );
    return {
        props: {
            product: res.data,
        },
    };
};

export default Product;