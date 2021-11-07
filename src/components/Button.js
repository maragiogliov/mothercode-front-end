const Button = ({ children, text, type, action, cls, name, id }) => {
    return (
        <>
            <button
                name={name}
                type={type}
                onClick={action}
                className={`button-${cls}`}
                id={id}
            >
                {text}
                {children}
            </button>
        </>
    );
};

export default Button;
