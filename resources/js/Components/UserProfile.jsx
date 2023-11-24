import PostCard from "@/Pages/twitter/commpoents/PostCard";
import mainContentAndNavWidthSetter from "@/Pages/twitter/functions/mainContentAndWidthSetter";
import { Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import ProfileDialog from "./ProfileDialog";
import { Toaster, toast } from "sonner";
import { ClipLoader } from "react-spinners";
import PreviewDialog from "./PreviewModal";
import PostDialog from "./PostDialog";
import ViewImage from "./ViewImage";

const UserProfile = ({ user, createdAt, comments, posts }) => {
    const { auth, flash } = usePage().props
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // console.log(auth.user)
        if (flash.success) {
            setLoading(false)
        }
        if (flash.error) {
            setLoading(false)
        }
    }, [flash])

    useEffect(() => {
        const array = [
            1, 2, 3, 4, 5, 6
        ]
        if (array) {
            array.forEach(arr => {
                mainContentAndNavWidthSetter(6)
            })
        }
    }, [user])

    const onFollow = () => {
        setLoading(true)
        router.post('/onfollow', {
            followerId: auth.user.id,
            toFollowId: user.id,
        })
    }

    const onUnFollow = () => {
        setLoading(true)
        router.post('/onunfollow', {
            _method: 'delete',
            followerId: user.auhtFollowerId,
            followingId: user.authFollowingId,
        })
    }

    return (
        <div className="w-full h-auto">
            <Toaster richColors />
            <div className={`w-full h-60 sm:h-64 md:h-[300px] bg-neutral-70 relative ${user.cover ? '' : 'bg-neutral-700'}`}>
                <img src={user.cover ? `/cover/${user.cover}` : ''} className={`w-full h-full object-cover object-center ${user.cover ? '' : 'opacity-0'}`} />
                {
                    user.image ? (
                        <ViewImage image={user.image ? `/profile/${user.image}` : null}>
                            <img src={user.image ? `/profile/${user.image}` : '/profile/avatar.png'} className={` ${user.image ? 'cursor-pointer hover:opacity-90' : ''} absolute z-10 -bottom-10 lg:-bottom-[70px] left-4 h-20 w-20 sm:h-28 sm:w-28 sm:-bottom-14 lg:h-[140px] lg:w-[140px] rounded-full border-[3px] border-neutral-900 object-cover object-center`} />
                        </ViewImage>
                    ) : (
                        <img src={user.image ? `/profile/${user.image}` : '/profile/avatar.png'} className={` ${user.image ? 'cursor-pointer hover:opacity-90' : ''} absolute z-10 -bottom-10 lg:-bottom-[70px] left-4 h-20 w-20 sm:h-28 sm:w-28 sm:-bottom-14 lg:h-[140px] lg:w-[140px] rounded-full border-[3px] border-neutral-900 object-cover object-center`} />
                    )
                }
            </div>
            <div className="mt-3 w-full px-4 flex justify-end items-center">
                {
                    auth.user.id == user.id && (
                        <ProfileDialog>
                            Edit Profile
                        </ProfileDialog>
                    )
                }

                {
                    auth.user.id !== user.id && user.onFollow == false && (
                        <button className={`border border-neutral-500 text-neutral-50 text-sm font-semibold sm:text-base ${loading ? 'px-8' : 'px-4'} py-1.5 rounded-full bg-black hover:bg-neutral-800 flex`} onClick={onFollow}>
                            <span className={loading ? 'hidden' : ''}>Follow</span>
                            <ClipLoader className='m-auto' loading={loading} color="white" size={20} />
                        </button>
                    )
                }

                {
                    auth.user.id !== user.id && user.onFollow == true && (
                        <button className={`border border-neutral-500 text-neutral-50 text-sm font-semibold sm:text-base ${loading ? 'px-8' : 'px-4'} py-1.5 rounded-full bg-black hover:bg-neutral-800 flex`} onClick={onUnFollow}>
                            <span className={loading ? 'hidden' : ''}>Unfollow</span>
                            <ClipLoader className='m-auto' loading={loading} color="white" size={20} />
                        </button>
                    )
                }
            </div>
            <div className="mt-4 md:mt-7 w-full px-6">
                <h2 className="text-neutral-50 text-xl font-extrabold">{user.name}</h2>
                <p className="text-neutral-500 font-light text-sm sm:text-[15px]">@{user.username}</p>
                {
                    user.bio && (
                        <div className="mt-2.5 mb-1">
                            <p className="text-neutral-50 text-xs sm:text-sm md:text-base">{user.bio}</p>
                        </div>
                    )
                }
                <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
                    {
                        user.location && (
                            <div className="hidden sm:flex items-center gap-1 mt-1 sm:mt-1.5">
                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    className="w-4 h-4 sm:h-5 sm:w-5 fill-neutral-500 mt-1"
                                >
                                    <g>
                                        <path d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z" />
                                    </g>
                                </svg>
                                <p className="mt-1.5 text-neutral-500 font-light text-sm sm:text-[15px]">{user.location}</p>
                            </div>
                        )
                    }
                    {
                        user.website && (
                            <div className="flex items-center gap-1 mt-1 sm:mt-1.5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                    className="w-4 h-4 sm:h-5 sm:w-5 stroke-neutral-500 mt-1"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                                    />
                                </svg>

                                <a href="https://facebook.com" target="_blank" className="mt-1.5 text-sky-500 font-light text-sm sm:text-[15px]">{user.website}</a>
                            </div>
                        )
                    }
                    <div className="flex items-center gap-1 mt-1 sm:mt-1.5">
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-4 h-4 sm:h-5 sm:w-5 fill-neutral-500 mt-1"
                        >
                            <g>
                                <path d="M7 4V3h2v1h6V3h2v1h1.5C19.89 4 21 5.12 21 6.5v12c0 1.38-1.11 2.5-2.5 2.5h-13C4.12 21 3 19.88 3 18.5v-12C3 5.12 4.12 4 5.5 4H7zm0 2H5.5c-.27 0-.5.22-.5.5v12c0 .28.23.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5H17v1h-2V6H9v1H7V6zm0 6h2v-2H7v2zm0 4h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm4-4h2v-2h-2v2z" />
                            </g>
                        </svg>
                        <p className="mt-1.5 text-neutral-500 font-light text-sm sm:text-[15px]">Joined {user.joined}</p>
                    </div>
                </div>
                <div className="mt-1.5 text-neutral-500 font-light text-sm sm:text-[15px] flex gap-1 sm:gap-2 items-center">
                    <div className="flex gap-1 sm:gap-1.5">
                        <p className="text-neutral-50 font-semibold">
                            {user.following.length}
                        </p>
                        <Link href={`/user/${user.id}/following`}>
                            <p className="hover:underline transition cursor-pointer underline-offset-2">Following</p>
                        </Link>
                    </div>
                    <div className="flex gap-1 sm:gap-1.5">
                        <p className="text-neutral-50 font-semibold">
                            {user.followers.length}
                        </p>
                        <Link href={`/user/${user.id}/followers`}>
                            <p className="hover:underline transition cursor-pointer underline-offset-2">Followers</p>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="w-full h-auto mt-6 sm:mt-8 px-6 flex justify-start">
                <div className="h-full sm:gap-2 flex flex-col gap-1 cursor-pointer w-[min-content]">
                    <h1 className="text-sm sm:text-base text-neutral-50">Tweets</h1>
                    <div className="w-full h-1 bg-sky-600 rounded-lg"></div>
                </div>
            </div>

            {
                user.posts &&
                user.posts.map((post, index) => (
                    <PostCard
                        idPost={post.id}
                        key={post.id}
                        user={user.name}
                        text={post.text}
                        image={post.image ? true : false}
                        imageUrl={post.image ? post.image : ''}
                        user_id={post.user_id}
                        username={user.username}
                        userImage={user.image}
                        createdAt={createdAt[index]}
                        likes={post.likes}
                        comments={post.comments ? post.comments : false}
                        followers={user.followers}
                        following={user.following}
                    />
                ))
            }
        </div>
    );
}

export default UserProfile;