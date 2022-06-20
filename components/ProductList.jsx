import styles from "../styles/ProductList.module.css";
import ProductCard from "./ProductCard";

const ProductList = ({ productList }) => {
    return (
        <div>
            <div className={styles.container}>
                <h1 className={styles.title}>Pizzas</h1>
                
                <div className={styles.wrapper}>
                    {productList[0].map((product) => {
                        return (
                            <ProductCard key={product._id} product={product}/>
                        )
                    })}
                </div>
            </div>

            <div className={styles.container}>
                <h1 className={styles.title}>Bebidas</h1>

                <div className={styles.wrapper}>
                    {productList[1].map((product) => {
                        return (
                            <ProductCard key={product._id} product={product}/>
                        )
                    })}
                </div>
            </div>

            <div className={styles.container}>
                <h1 className={styles.title}>Combos</h1>

                <div className={styles.wrapper}>
                    {productList[2].map((product) => {
                        return (
                            <ProductCard key={product._id} product={product}/>
                        )
                    })}
                </div>
            </div>
        </div>
        
    );
};

export default ProductList;