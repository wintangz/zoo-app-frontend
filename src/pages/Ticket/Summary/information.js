import styles from './Infomation.module.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import PublicIcon from '@mui/icons-material/Public';
import EmailIcon from '@mui/icons-material/Email';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
export default function Information(props) {
    console.log(props);
    return (
        <>
            <tr className={styles.row}>
                <td className={styles.name}><AccountCircleIcon />Full Name:</td>
                <td className={styles.value}>{props.info.lastname} {props.info.firstname}</td>
            </tr>
            <tr className={styles.row}>
                <td className={styles.name}><HomeIcon />Address:</td>
                <td className={styles.value}>{props.info.address}</td>
            </tr>
            <tr className={styles.row}>
                <td className={styles.name}><PublicIcon />Nationality:</td>
                <td className={styles.value}>{props.info.nationality}</td>
            </tr>
            <tr className={styles.row}>
                <td className={styles.name}><EmailIcon />Email:</td>
                <td className={styles.value}>{props.info.email}</td>
            </tr>
            <tr className={styles.row}>
                <td className={styles.name}><SmartphoneIcon />Phone:</td>
                <td className={styles.value}>{props.info.phone}</td>
            </tr>
        </>

    );
}