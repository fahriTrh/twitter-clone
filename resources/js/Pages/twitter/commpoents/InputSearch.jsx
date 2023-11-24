
const InputSearch = ({onChange, onClick}) => {

    return (
        <div className="hidden lg:block md:w-80 xl:w-[380px] h-auto mx-auto mt-[3px] z-50 bg-black relative">
            <input onClick={onClick} onChange={onChange} type="text" className="w-full mx-auto px-4 py-2 rounded-2xl bg-gray-600/30 border-none text-white placeholder:text-neutral-400 focus:ouline-none focus:ring-sky-600" placeholder="Search" />
        </div>
    );
}

export default InputSearch;