import styles from './CheckBox.module.css';

function CheckBox({ Id, OnChange, Checked, Text }) {
    return (
        <div className={styles.checkboxWrapper}>
            <label className={styles.switchContainer}>
                <input
                    className={styles.checkbox}
                    type='checkbox'
                    id={Id}
                    onChange={OnChange}
                    checked={Checked}
                    aria-checked={Checked}
                />
                <span className={styles.slider}></span>
            </label>
            <label htmlFor={Id} className={styles.labelText}>{Text}</label>
        </div>
    )
}

export default CheckBox;