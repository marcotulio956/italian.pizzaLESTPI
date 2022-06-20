import Head from "next/head";
import styles from "../styles/Home.module.css";
import Featured from "../components/Featured";
import ProductList from "../components/ProductList";
import axios from "axios";

const Home = ({ productList }) => (
    <div className={styles.container}>

        <Head>
            <title>Italian Pizza</title>
            <meta name="description" content="Descrição da pizzaria" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Featured />
        <ProductList productList={productList}/>
    </div>
);

Home.getInitialProps = async () => {
  const response = await axios.get(
    "https://italian-pizza-iota.vercel.app/api/products"
  )

  return { productList: response.data }
}

export default Home;