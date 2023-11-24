import Icon from "@/Pages/twitter/commpoents/Icon";
import CardList from "./CardList";


const SearchModal = ({ isOpen, id, modalDelete, data = null }) => {
    return (
        <>
            <div id={id} className={`${isOpen === true ? 'block' : 'hidden'} w-full bg-black rounded-md mt-2 p-3 text-neutral-100 relative shadow-sm modal`} style={{ boxShadow: '0 0 5px 0 rgb(255 255 255 / 0.7)' }}>
                <div className=" cursor-pointer" >
                    {
                        data && data.length !== 0 ? (
                            data.map(d => (
                                <CardList key={d.id} type='search' data={d} />
                            ))
                        ) : (
                            <h2 className="text-neutral-500 text-xs sm:text-sm font-semibold text-center">Not Found</h2>
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default SearchModal;