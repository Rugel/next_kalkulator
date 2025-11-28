import React from "react";

interface InputProps {
    content: string;
    method: any;
    plhld?: any;
    name: string;
    number?: number;
    monthSelector?: boolean;
    onMonthSelect?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    defaultMonthValue?: string;
}

const Input: React.FC<InputProps> = ({ content, method, plhld, name, number, monthSelector, onMonthSelect, defaultMonthValue }) => (
    <div className="input-wrapper">
        <label htmlFor={name} className="input-label">
            {number && <span className="input-number">{number}. </span>}
            {content}
        </label>
        <input
            id={name}
            className="input"
            type="number"
            onChange={method}
            value={monthSelector ? plhld : undefined}
            placeholder={monthSelector ? undefined : plhld}
            name={name}
            aria-label={content}
        />
        {monthSelector && (
            <div style={{ marginTop: '1rem' }}>
                <label htmlFor={`${name}-month`} className="input-label">
                    lub wybierz żądany miesiąc:
                </label>
                <input
                    id={`${name}-month`}
                    type="month"
                    onChange={onMonthSelect}
                    className="input"
                    defaultValue={defaultMonthValue}
                />
            </div>
        )}
    </div>
);

export default Input;