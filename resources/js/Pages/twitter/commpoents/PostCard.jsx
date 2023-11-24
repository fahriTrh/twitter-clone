import { useEffect, useState } from "react";
import Icon from "./Icon";
import AvatarImage from "./avatarImage";
import moment from "moment/moment";
import ModalOption from "./ModalOption";
import ReactModal from "react-modal";
import ModalDelete from "./ModalDelete";
import { Link, router, usePage } from "@inertiajs/react";
import MyPopover from "./MyPopover";
import CommentDialog from "@/Components/CommentDialog";
import PreviewModal from "@/Components/PreviewModal";


const PostCard = ({
    style,
    image = false,
    imageUrl,
    text,
    user,
    createdAt,
    idPost,
    user_id,
    username,
    userImage = null,
    likes,
    comments,
    followers,
    following,
    bio,
    cover,
    isShow = false }) => {

    const [modalOpen, setModalOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const { auth, flash } = usePage().props
    const [isLiked, setIsLiked] = useState(false)
    const [likeId, setLikeId] = useState('')

    useEffect(() => {
        // console.log(cover);
        likes.map(like => {
            if (like.user_id == auth.user.id) {
                setIsLiked(true)
                setLikeId(like.id)
            }
        })
    }, [flash])

    const like = (e) => {
        e.preventDefault()
        const data = {
            user_id: auth.user.id,
            post_id: idPost
        }
        router.post('/like', data)
        setIsLiked(true)
    }

    const unLike = (e) => {
        e.preventDefault()
        setIsLiked(false)
        router.delete(`/like/${likeId}`)
    }

    const modalDltOpen = () => {
        setModalOpen(false)
        setDeleteOpen(true)
    }

    const onCancel = () => {
        setDeleteOpen(false)
    }

    const toShow = () => {
        document.location.href = `/twitter/${idPost}`
    }


    return (
        <div>
            <div id="content" className={`w-full h-auto p-3 flex gap-2.5 items-start ${!isShow ? 'hover:bg-neutral-900 cursor-pointer border-t border-t-neutral-700' : 'cursor-default'} ${style}`} >
                <PreviewModal
                    user={user}
                    id={user_id}
                    username={username}
                    image={userImage}
                    followers={followers}
                    following={following}
                    bio={bio}
                    cover={cover}
                >
                    <Link href={`/user/${user_id}`}>
                        {
                            userImage && (
                                <AvatarImage img={userImage} />
                            )
                        }
                        {
                            !userImage && (
                                <AvatarImage />
                            )
                        }
                    </Link>
                </PreviewModal>
                <div className="w-[85%] sm:w-[90%] h-auto relative">
                    <div className="w-full h-auto flex items-center justify-between">
                        <div className={`flex flex-col ${!isShow ? 'sm:flex-row sm:gap-2 sm:items-center' : ''}`}>
                            <PreviewModal
                                user={user}
                                id={user_id}
                                username={username}
                                image={userImage}
                                followers={followers}
                                following={following}
                                bio={bio}
                                cover={cover}
                            >
                                <Link href={`/user/${user_id}`}>
                                    <h2 className="text-neutral-50 font-semibold text-sm sm:text-base md:text-lg hover:underline underline-offset-2">{user}</h2>
                                </Link>
                            </PreviewModal>

                                {
                                    isShow && (
                                        <p className="text-neutral-500 text-xs sm:text-sm mb-1"> @{username}</p>
                                    )
                                }
                                {
                                    !isShow && (
                                        <div className="flex gap-2 sm:gap-1.5 items-center">
                                            <p className="text-neutral-500 text-xs sm:text-sm"> @{username}</p>
                                            <p className="text-neutral-500 text-xs sm:text-sm">{createdAt}</p>
                                        </div>
                                    )
                                }
                        </div>
                        {
                            user_id == auth.user.id || auth.user.id == 1 ? (
                                <>
                                    <MyPopover>
                                        <ModalOption id='optionModal' isOpen={true} modalDelete={modalDltOpen} />
                                    </MyPopover>
                                    <ModalDelete isOpen={deleteOpen} onCancel={onCancel} id={idPost} />
                                </>
                            ) : (
                                <Icon type='option' style='hover:cursor-not-allowed' />
                            )
                        }

                        {/* {
                            user_id !== auth.user.id && (
                                <Icon type='option' style='hover:cursor-not-allowed' />co
                            )
                        } */}
                    </div>

                    {
                        !isShow && (
                            <>
                                <div className="text-neutral-50 mt-1 sm:mt-0 whitespace-pre-wrap">
                                    <p id="text" className={`whitespace-pre-wrap line-clamp-3 text-sm sm:text-base ${isShow ? 'md:text-lg' : ''}`} onClick={(e) => e.target.classList.toggle('line-clamp-3')}>
                                        <Link href={`/twitter/${idPost}`}>
                                            {text}
                                        </Link>
                                    </p>
                                </div>

                                {
                                    image && (
                                        <Link href={`/twitter/${idPost}`}>
                                            <img src={`/post-images/${imageUrl}`} className={`my-1 w-full h-[300px] sm:h-[350px]  object-cover object-center bg-neutral-500 rounded-xl`}>
                                            </img>
                                        </Link>
                                    )
                                }

                                <div className={`w-full flex justify-between items-center`}>
                                    <div className="flex items-center hover:text-pink-600 cursor-pointer text-xs sm:text-sm">
                                        <form className="inline">
                                            <div className="w-[min-content] h-[max-content]">
                                                <Icon type={isLiked && likes.length !== 0 ? 'liked' : 'like'} onClick={isLiked ? unLike : like} />
                                            </div>
                                        </form>
                                        <span className={isLiked ? 'text-pink-600' : ''}>{likes.length !== 0 ? likes.length : ''}</span>
                                    </div>
                                    <div className="flex items-center hover:text-sky-600 cursor-pointer text-xs sm:text-sm">
                                        <div className="w-[min-content] h-[max-content]">
                                            {/* <Icon type='comment' /> */}
                                            <CommentDialog createdAt={createdAt} idPost={idPost} textPost={text} user={user} user_id={user_id} username={username} userImage={userImage ? userImage : null} />
                                        </div>

                                        {
                                            comments.length !== 0 && (
                                                <span>{comments.length}</span>
                                            )
                                        }

                                    </div>
                                    <div className="items-center hover:text-green-600 cursor-pointer text-xs flex sm:text-sm">
                                        <div className="w-[min-content] h-[max-content]">
                                            <Icon type='retweet' />
                                        </div>
                                        <span></span>
                                    </div>
                                    <div className="items-center hover:text-sky-600 cursor-pointer text-xs hidden sm:flex sm:text-sm">
                                        <div className="w-[min-content] h-[max-content]">
                                            <Icon type='charts' />
                                        </div>
                                        <span></span>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>

            {
                isShow && (
                    <div className="px-3">
                        <div className="text-neutral-50 mt-1 sm:mt-0 whitespace-pre-wrap">
                            <p id="text" className={`whitespace-pre-wrap line-clamp-3 text-sm sm:text-base ${isShow ? 'md:text-lg' : ''}`} onClick={(e) => e.target.classList.toggle('line-clamp-3')}>
                                {text}
                            </p>
                        </div>

                        {
                            image && (
                                <img src={`/post-images/${imageUrl}`} className={`my-1 w-full h-[300px] sm:h-[350px] md:h-[380px] lg:h-[400px] object-cover object-center bg-neutral-500 rounded-lg`}>
                                </img>
                            )
                        }

                        {
                            isShow && (
                                <div className="mt-3 sm:mt-4 md:mt-6">
                                    <p className="text-xs sm:text-sm text-neutral-500">{createdAt}</p>
                                </div>
                            )
                        }

                        {/* {
                            isShow &&
                            likes &&
                            comments && (
                                <div className="py-2 sm:py-3 md:py-4 mt-2 sm:mt-3 md:mt-4 border-t border-t-neutral-700 flex gap-1.5 sm:gap-2 md:gap-3">
                                    {
                                        comments.length !== 0 && (
                                            <p className="text-xs sm:text-sm md:text-base text-neutral-500"><span className="text-neutral-50">{comments.length}</span> Comments</p>
                                        )
                                    }
                                    {
                                        likes.length !== 0 && (
                                            <p className="text-xs sm:text-sm md:text-base text-neutral-500"><span className="text-neutral-50">{likes.length}</span> Likes</p>
                                        )
                                    }
                                </div>
                            )
                        } */}

                        <div className={`w-full flex justify-between items-center ${isShow ? 'border-t border-t-neutral-700 py-2 sm:py-3' : ''}`}>
                            <div className="flex items-center hover:text-pink-600 cursor-pointer text-xs sm:text-sm">
                                <form className="inline">
                                    <div className="w-[min-content] h-[max-content]">
                                        <Icon type={isLiked && likes.length !== 0 ? 'liked' : 'like'} onClick={isLiked ? unLike : like} />
                                    </div>
                                </form>
                                <span className={isLiked ? 'text-pink-600' : ''}>{likes.length !== 0 ? likes.length : ''}</span>
                            </div>
                            <div className="flex items-center hover:text-sky-600 cursor-pointer text-xs sm:text-sm">
                                <div className="w-[min-content] h-[max-content]">
                                    {/* <Icon type='comment' /> */}
                                    <CommentDialog createdAt={createdAt} idPost={idPost} textPost={text} user={user} user_id={user_id} username={username} userImage={userImage ? userImage : null} />
                                </div>
                                {
                                    comments.length !== 0 && (
                                        <span>{comments.length}</span>
                                    )
                                }
                            </div>
                            <div className="items-center hover:text-green-600 cursor-pointer text-xs flex sm:text-sm">
                                <div className="w-[min-content] h-[max-content]">
                                    <Icon type='retweet' />
                                </div>
                                <span></span>
                            </div>
                            <div className="items-center hover:text-sky-600 cursor-pointer text-xs hidden sm:flex sm:text-sm">
                                <div className="w-[min-content] h-[max-content]">
                                    <Icon type='charts' />
                                </div>
                                <span></span>
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    );
}

export default PostCard;