import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', placeholder, className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                'w-full h-14 rounded-md bg-black outline-none focus:outline-none ring-0 focus:ring-0 border border-neutral-600 focus:border-sky-700 text-neutral-50 sm:text-lg sm:placeholder:text-lg placeholder:text-neutral-600 ' +
                className
            }
            placeholder={placeholder}
            ref={input}
        />
    );
});
