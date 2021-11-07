const TextArea = ({ label, name, value, action }) => {
    return (
        <div>
            <label htmlFor={name}>{label}</label>

            <input
                rows="4"
                cols="50"
                autoComplete="off"
                id={name}
                name={name}
                type={name}
                value={value}
                onChange={action}
                placeholder="Add comment..."
            />
        </div>
    );
};

export default TextArea;
