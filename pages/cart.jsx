import styles from "../styles/Cart.module.css";
import Image from "next/image";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct } from "../redux/cartSlice";
import { reset } from "../redux/cartSlice";
import { useState } from "react";

const Cart = ({ dbAddress }) => {

    const [showFeedbackMsg, setFeedbackMsg] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch()

    const FeedbackMsg = () => (
        <div id="feedback"> Pedido registrado</div>
    )

    const ShowModal = () => (
        <div id="myModal" className={styles.modal}>
            <div className={styles.modalcontent}>
                <div className={styles.modalheader}>
                    <h1>Pedido Confirmado</h1>
                </div>
                <div className={styles.modalbody}>
                    <br/>
                    <h2>Entre em contato para acompanhar o pedido.</h2>
                    <a href="../#"><button className={styles.button} onClick={handleModal} action="/">Ok!</button></a>
                </div>
                <div className={styles.modalfooter}>
                    <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                        <Image src="/img/social/social-instagram.png" width="50px" height="50px" alt="" />
                    </a>
                    <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                        <Image src="/img/social/social-facebook.png" width="50px" height="50px" alt="" />
                    </a>
                    <a href="https://www.pinterest.com/" target="_blank" rel="noreferrer">
                        <Image src="/img/social/social-pinterest.png" width="50px" height="50px" alt="" />
                    </a>
                    <a href="#">
                        <Image src="/img/social/social-whatsapp.png" width="50px" height="50px" alt="" />
                    </a>
                </div>
            </div>
        </div>

    )

    const address = {
        street: "",
        number: "",
        neighborhood: "",
        city: "Belo Horizonte",
        cep: ""
    }

    const user = {
        userName: "",
        cpf: "",
        email: "",
        phone: "",
        address: address,
        password: ""
    }

    const getUserName = (event) => { user.userName = event.target.value; }
    const getUserCpf = (event) => { user.cpf = event.target.value; }
    const getUserEmail = (event) => { user.email = event.target.value; }
    const getUserPhone = (event) => { user.phone = event.target.value; }
    const getStreet = (event) => { address.street = event.target.value; }
    const getHouseNumber = (event) => { address.number = event.target.value; }
    const getNeighborhood = (event) => { address.neighborhood = event.target.value; }
    const getCep = (event) => { address.cep = event.target.value; }
    const getPassword = (event) => { user.password = event.target.value; }

    const handleClick = () => {
        createOrder({
            customer: user,
            products: cart.products,
            total: cart.total
        })

        createUser({
            customer: user.userName,
            cpf: user.cpf,
            email: user.email,
            phone: user.phone,
            address: user.address,
            password: user.password
        })

        setFeedbackMsg(true)

        setShowModal(true)

        setTimeout(() => {
            setFeedbackMsg(false);
        }, 1500);
    };

    const handleModal = () => {
        setShowModal(false)

        dispatch(reset());
    }

    const removeItem = (product) => {
        const id = product._id;
        const extraOption = product.extraOption;
        const price = product.price;
        const quantity = product.quantity;

        dispatch(removeProduct({product, id, extraOption, price, quantity}));
    }
    if (cart.total == 0) {
        return (
            <div className={styles.emptyCart}>
                <h1>Carrinho vazio</h1>
            </div>
        )
    } else {
        return (
            <div className={styles.container}>
                {showModal ? 
                    <div className={styles.emptyFinz}>
                        <ShowModal />
                    </div>
                :
                <div>
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.trTitle}>
                                <th>Produto</th>
                                <th>Nome</th>
                                <th>Variação</th>
                                <th>Preço</th>
                                <th>Quantidade</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.products.map((product) => (
                                <tr className={styles.tr} key={product._id}>
                                    <td>
                                        <div className={styles.imgContainer}>
                                            <Image src={product.image} objectFit="contain" layout="fill" alt=""/>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={styles.name}>{product.title}</span>
                                    </td>
                                    <td>
                                        <span className={styles.extras}>{product.extraOption}</span>
                                    </td>
                                    <td>
                                        <span className={styles.price}>R$ {product.price}</span>
                                    </td>
                                    <td>
                                        <span className={styles.quantity}>{product.quantity}</span>
                                    </td>
                                    <td>
                                        <span className={styles.total}>R$ {(product.price * product.quantity).toFixed(2)}</span>
                                    </td>
                                    <td>
                                        <button className={styles.button} onClick={() => removeItem(product)}>Remover do Carrinho</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                <div className={styles.userForm}>
                    <h2 className={styles.title}>DADOS PESSOAIS</h2>

                    <div className={styles.formItem}>
                        <label htmlFor="name">Nome completo: </label>
                        <input type="text" id="name" name="name" required onChange={getUserName} />
                    </div>

                    <div className={styles.formItem}>
                        <label htmlFor="cpf">CPF: </label>
                        <input type="text" id="cpf" name="cpf" required onChange={getUserCpf} />
                    </div>

                    <div className={styles.formItem}>
                        <label htmlFor="email">E-mail: </label>
                        <input type="text" id="email" name="email" required onChange={getUserEmail} />
                    </div>

                    <div className={styles.formItem}>
                        <label htmlFor="phone">Telefone: </label>
                        <input type="text" id="phone" name="phone" required onChange={getUserPhone} />
                    </div>

                    <div className={styles.formItem}>
                        <label htmlFor="password">Senha: </label>
                        <input type="password" id="password" onChange={getPassword} required />
                    </div>

                    <h2 className={styles.title}>ENDEREÇO</h2>
                    <div className={styles.formItem}>
                        <label htmlFor="street">Rua: </label>
                        <input type="text" id="street" name="street" onChange={getStreet} required />
                    </div>

                    <div className={styles.formItem}>
                        <label htmlFor="number">Número casa/apartamento: </label>
                        <input type="text" id="number" name="number" onChange={getHouseNumber} required />
                    </div>

                    <div className={styles.formItem}>
                        <label htmlFor="neighborhoods">Bairro: </label>
                        <select name="neighborhoods" id="neighborhood" onChange={getNeighborhood} required>
                            {dbAddress[0].bairro.map((neighborhood, index) => {
                                return (
                                    <option key={index} value={neighborhood}>{neighborhood}</option>
                                )
                            })}
                        </select>
                    </div>

                    <div className={styles.formItem}>
                        <label htmlFor="cities">Cidade: </label>
                        <select name="cities" id="city" disabled>
                            <option value={dbAddress[0].cidade}>{dbAddress[0].cidade}</option>
                        </select>
                    </div>

                    <div className={styles.formItem}>
                        <label htmlFor="cep">CEP: </label>
                        <input type="text" id="cep" name="cep" onChange={getCep} required />
                    </div>
                </div>

                <div>
                    <div className={styles.wrapper}>
                        <h2 className={styles.title}>VALOR TOTAL</h2>
                        <div className={styles.totalText}>R$ {cart.total.toFixed(2)}</div>
                        <button className={styles.button} onClick={handleClick}>FINALIZAR</button>
                        {showFeedbackMsg ? <FeedbackMsg /> : null}
                        {showModal ? <ShowModal /> : null}
                    </div>
                </div>
                </div>}
            </div>
        );
    }
};

const createOrder = async (data) => {
    const res = await axios.post("https://italian-pizza-iota.vercel.app/api/orders", data);
};

const createUser = async (data) => {
    const res = await axios.post("https://italian-pizza-iota.vercel.app/api/users", data);
};

Cart.getInitialProps = async () => {
    const response = await axios.get(
        'https://italian-pizza-iota.vercel.app/api/address'
    )

    return { dbAddress: response.data }
}

export default Cart;
