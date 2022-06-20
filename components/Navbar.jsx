import Image from 'next/image'
import styles from '../styles/Navbar.module.css'
import { useSelector } from "react-redux"
import Link from "next/link";

const Navbar = () => {
    const quantity = useSelector(state => state.cart.quantity)
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.logo}>
                    <Link href='/'>
                        <Image src="/img/logo.png" alt="" width="232px" height="130px" />
                    </Link>
                </div>
            </div>

            <div className={styles.item}>
                <div className={styles.cart}>
                    <Link href='/cart'>
                        <Image src="/img/cart.png" alt="" width="30px" height="30px" />
                    </Link>
                    <div className={styles.counter}>{quantity}</div>
                </div>
            </div>
        </div>
    )
}

export default Navbar