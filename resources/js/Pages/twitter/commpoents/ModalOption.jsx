import Icon from "./Icon";

const ModalOption = ({ isOpen, id, modalDelete }) => {
    return (
        <>
            <div id={id} className={`${isOpen === true ? 'flex' : 'hidden'} px-4 py-2 bg-black rounded-md p-3 text-neutral-100 absolute top-0 right-0 shadow-sm z-50 modal`} style={{ boxShadow: '0 0 5px 0 rgb(255 255 255 / 0.7)' }}>
                <div className="m-auto flex items-center cursor-pointer" onClick={modalDelete}>
                    <Icon type='delete' />

                    <span className="text-sm sm:text-base mt-1" style={{ color: 'red' }}>Delete</span>
                </div>
            </div>
        </>
    );
}

export default ModalOption;