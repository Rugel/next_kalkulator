import React from "react";
const Input = ({ content, method, plhld, name }) => (
    <div className="input-wrapper">
        <label htmlFor={name} className="input-label">{content}</label>
        <input
            id={name}
            className="input"
            type="number"
            onChange={method}
            placeholder={plhld}
            name={name}
            aria-label={content}
        />
    </div>
);

export default Input;