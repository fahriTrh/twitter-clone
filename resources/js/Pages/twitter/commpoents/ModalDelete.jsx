import { router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const ModalDelete = ({ isOpen, id, onCancel, isComment = false }) => {
    const [loading, setLoading] = useState(false)
    const { flash } = usePage().props
    
    const onSubmit = (e) => {
        e.preventDefault()
        router.delete(`/twitter/${id}`)
    }

    const onSubmitComment = (e) => {
        e.preventDefault()
        router.delete(`/comment/${id}`)
    }

    useEffect(() => {
        if (flash.success) {
            setLoading(false)
        }
    }, [flash])

    return (
        <>
            {
                isOpen && (
                    <div className="fixed top-0 bottom-0 right-0 left-0 flex z-40 bg-[rgba(91,112,131,.4)]">
                        <div className="m-auto relative z-50 w-[270px] h-auto min-h-[260px] sm:w-[340px] sm:min-h-[290px] rounded-xl p-8 bg-black text-neutral-white">
                            <h2 className="text-white text-lg font-semibold sm:text-xl">Delete Tweet?</h2>
                            <p className="text-sm sm:text-base text-neutral-500 mt-1 sm:mt-2">
                                This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from search results.
                            </p>

                            <form onSubmit={isComment ? onSubmitComment : onSubmit}>
                                <button type="submit" onClick={() => setLoading(true)} className="mt-3 rounded-full w-full h-auto py-2 px-4 text-white bg-[#F4212E] text-sm sm:text-base font-semibold">
                                    <span className={loading ? 'hidden' : ''}>Delete</span>
                                    <ClipLoader className='m-auto' loading={loading} color="white" size={30} />
                                </button>
                                <button onClick={onCancel} type="button" className="mt-3 rounded-full w-full h-auto py-2 px-4 text-white bg-transparent hover:bg-gray-700/50 border border-neutral-600 text-sm sm:text-base font-semibold">Cancel</button>
                            </form>
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default ModalDelete;