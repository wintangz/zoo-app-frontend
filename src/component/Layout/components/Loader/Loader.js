
import styles from "./Loader.module.scss"

function Loader() {


    return (
        // <div className={styles.container_error}>
        //     <div className={styles.loader}></div>
        // </div>
        <div className={styles.container_error}>
            {/* <svg class={styles.spinner} x="0 0 50 50">
                <circle class={styles.path} cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
            </svg> */}
            <div className={styles.loader}></div>
        </div>



    );
}

export default Loader;