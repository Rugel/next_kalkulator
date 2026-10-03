import React from "react";
import styles from "./Input.module.css";

interface InputProps {
    content: string;
    method: any;
    plhld?: any;
    name: string;
    number?: number;
    monthSelector?: boolean;
    onMonthSelect?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    defaultMonthValue?: string;
    monthValue?: string;
}

const Input: React.FC<InputProps> = ({
    content,
    method,
    plhld,
    name,
    number,
    monthSelector,
    onMonthSelect,
    defaultMonthValue,
    monthValue,
}) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // When the field starts with the default value 0, the browser can
        // produce values such as "05" after entering the first digit.
        // Remove only an unnecessary leading zero before passing the event
        // to the parent handler. Values such as "0.5" remain unchanged.
        if (/^0\d/.test(e.target.value)) {
            e.target.value = e.target.value.replace(/^0+/, '');
        }

        method(e);
    };

    return (
        <div className={styles.inputWrapper}>
            <label htmlFor={name} className={styles.inputLabel}>
                {number && <span className="input-number">{number}. </span>}
                {content}
            </label>
            <input
                id={name}
                className={styles.input}
                type="number"
                onChange={handleInputChange}
                value={monthSelector ? plhld : (plhld !== undefined ? plhld : undefined)}
                placeholder={monthSelector ? undefined : (plhld === undefined ? undefined : undefined)}
                name={name}
                aria-label={content}
            />
            {monthSelector && (
                <div style={{ marginTop: '1rem' }}>
                    <label htmlFor={`${name}-month`} className={styles.inputLabel}>
                        lub wybierz żądany miesiąc:
                    </label>
                    <input
                        id={`${name}-month`}
                        type="month"
                        onChange={onMonthSelect}
                        className={styles.input}
                        {...(monthValue !== undefined
                            ? { value: monthValue }
                            : { defaultValue: defaultMonthValue })}
                    />
                </div>
            )}
        </div>
    );
};

export default Input;