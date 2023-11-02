import styles from "./Loader.module.scss"

function Loader() {


    return (
        <div className={styles.container_error}>
            <div className={styles.loader}></div>
        </div>
    )
}

export default Loader;