import { Link, usePage } from "@inertiajs/react";
import Icon from "./Icon";
import AvatarImage from "./avatarImage";
import CommentDialog from "@/Components/CommentDialog";
import MyPopover from "./MyPopover";
import ModalOption from "./ModalOption";
import ModalDelete from "./ModalDelete";
import { useEffect, useState } from "react";
import PreviewModal from "@/Components/PreviewModal";
import CommentFormDialog from "@/Components/CommentFormDialog";

const CommentCard = ({
    style,
    imageUrl = false,
    text,
    user,
    createdAt,
    idPost,
    user_id,
    username,
    userImage = null,
    likes,
    commentId,
    followers,
    following,
    bio,
    cover,
    recipentUsername
}) => {
    const { auth, flash } = usePage().props
    const [modalOpen, setModalOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)

    const modalDltOpen = () => {
        setModalOpen(false)
        setDeleteOpen(true)
    }

    const onCancel = () => {
        setDeleteOpen(false)
    }

    return (
        <div className="px-3">
            <div id="content" className={`w-full h-auto border-t border-t-neutral-700 py-3 flex gap-2.5 items-start 'hover:bg-neutral-900 cursor-pointer' ${style}`}>
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
                        <div className={`flex gap-1 sm:gap-2`}>
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
                            <div className="flex gap-2 sm:gap-1.5 items-center">
                                <p className="text-neutral-500 text-xs sm:text-sm"> @{username}</p>
                                <p className="text-neutral-500 text-xs sm:text-sm">{createdAt}</p>
                            </div>
                        </div>
                        {
                            user_id == auth.user.id && (
                                <>
                                    <MyPopover>
                                        <ModalOption id='optionModal' isOpen={true} modalDelete={modalDltOpen} />
                                    </MyPopover>
                                    <ModalDelete isOpen={deleteOpen} isComment={true} onCancel={onCancel} id={commentId} />
                                </>
                            )
                        }

                        {
                            user_id !== auth.user.id && (
                                <Icon type='option' style='hover:cursor-not-allowed' />
                            )
                        }
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-500 -mt-1 mb-1">
                        Replying to <span className="text-sky-600">@{recipentUsername}</span>
                    </p>
                    <div className="text-neutral-50 mt-1 sm:mt-0 whitespace-pre-wrap">
                        <p id="text" className={`whitespace-pre-wrap line-clamp-3 text-sm sm:text-base`} onClick={(e) => e.target.classList.toggle('line-clamp-3')}>
                            {text}
                        </p>
                    </div>

                    {
                        imageUrl && (
                            <img src={`/comment-images/${imageUrl}`} className={`my-1 w-[90%] h-[200px] sm:h-[280px] object-cover object-center bg-neutral-500 rounded-lg`}>
                            </img>
                        )
                    }

                    <div className={`w-full flex justify-between items-center`}>
                        <div className="flex items-center hover:text-pink-600 cursor-pointer text-xs sm:text-sm">
                            <form className="inline">
                                <div className="w-[min-content] h-[max-content]">
                                    {/* <Icon type={isLiked && likes.length !== 0 ? 'liked' : 'like'} onClick={isLiked ? unLike : like} /> */}
                                    <Icon type='like' />
                                </div>
                            </form>
                            {/* <span className={isLiked ? 'text-pink-600' : ''}>{likes.length !== 0 ? likes.length : ''}</span> */}
                        </div>
                        <div className="flex items-center hover:text-sky-600 cursor-pointer text-xs sm:text-sm">
                            <div className="w-[min-content] h-[max-content]">
                                <Icon type='comment' />
                                {/* <CommentDialog createdAt={createdAt} idPost={idPost} textPost={text} user={user} user_id={user_id} username={username} userImage={userImage ? userImage : null} /> */}
                            </div>
                            <span></span>
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
            </div>
        </div>
    );
}

export default CommentCard;