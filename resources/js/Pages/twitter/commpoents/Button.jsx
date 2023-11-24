const Button = ({style, children,type}) => {
    return (
        <button type={type} className={`bg-sky-600  py-1 px-4 transition rounded-full text-neutral-100 font-semibold text-sm md:text-base ${style}`}>
            { children }
        </button>
    );
}

export default Button;