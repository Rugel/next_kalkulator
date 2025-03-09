import styles from './CheckBox.module.css';

function CheckBox({ Id, OnChange, Checked, Text }) {
    return (
        <div><label className={styles.switchContainer} ><input className={styles.checkbox} type='checkbox' id={Id} onChange={OnChange} checked={Checked} /><span className={styles.slider}></span></label>{Text}</div>
    )
}

export default CheckBox;