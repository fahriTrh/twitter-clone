import { Link } from "@inertiajs/react";
import AvatarImage from "./avatarImage";
import PreviewModal from "@/Components/PreviewModal";
import { useEffect } from "react";

const FollowCard = ({ user }) => {
    useEffect(() => {
        // console.log(user);
    }, [])
    return (
        <div className="w-full h-auto flex justify-between items-center pb-3 hover:cursor-pointer">
            <div className="w-auto h-auto flex gap-2 items-center">
                <PreviewModal
                    user={user.name}
                    username={user.username}
                    image={user.image}
                    followers={user.followers}
                    following={user.following}
                    bio={user.bio}
                    id={user.id}
                    cover={user.cover}>

                    <Link href={`/user/${user.id}`}>
                        <AvatarImage img={user.image} /*size='md:w-12 md:h-12'*/ />
                    </Link>

                </PreviewModal>
                <div className="flex flex-col gap-0.5 md:gap-1">
                    <PreviewModal
                        user={user.name}
                        username={user.username}
                        image={user.image}
                        followers={user.followers}
                        following={user.following}
                        bio={user.bio}
                        id={user.id}
                        cover={user.cover}>

                        <Link href={`/user/${user.id}`}>
                            <h3 className="text-white font-semibold hover:underline underline-ofset-2 ">{user.name}</h3>
                        </Link>
                    </PreviewModal>
                    <p className="text-neutral-500 -mt-1 text-xs sm:text-sm">@{user.username}</p>
                </div>
            </div>

            <div className="px-4 h-8 bg-neutral-200 text-neutral-900 rounded-2xl flex">
                <p className="font-semibold text-sm m-auto">
                    <Link href={`/user/${user.id}`}>
                        Detail
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default FollowCard;