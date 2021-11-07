const Field = ({ label, name, value, action, cls, boxClass }) => {
    return (
        <div className={boxClass}>
            <label htmlFor={name}>{label}</label>

            <input
                autoComplete="off"
                id={name}
                name={name}
                type={name}
                value={value}
                onChange={action}
                placeholder={`${name}`[0].toUpperCase() + `${name}`.slice(1)}
                className={cls}
            />
        </div>
    );
};

export default Field;
