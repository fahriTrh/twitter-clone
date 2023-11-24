import AvatarImage from "@/Pages/twitter/commpoents/avatarImage";
import { Link } from "@inertiajs/react";
import PreviewModal from "./PreviewModal";
import { useEffect } from "react";

const CardList = ({ data, type }) => {
    useEffect(() => {
        // console.log(data);
    }, [])
    return (
        <div className={`w-full flex items-center justify-between cursor-pointer ${type !== 'search' ? 'hover:bg-neutral-900' : ''} transition-all p-2 rounded-md`}>

            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
                <PreviewModal
                    user={data.name}
                    username={data.username}
                    image={data.image}
                    followers={data.followers}
                    following={data.following}
                    bio={data.bio}
                    id={data.id}
                    cover={data.cover}>

                    <Link href={`/user/${data.id}`}>
                        <AvatarImage img={data.image} style='md:h-12 md:w-12' />
                    </Link>
                </PreviewModal>

                <div className="flex flex-col">

                    <PreviewModal
                        user={data.name}
                        username={data.username}
                        image={data.image}
                        followers={data.followers}
                        following={data.following}
                        bio={data.bio}
                        id={data.id}
                        cover={data.cover}>

                        <Link href={`/user/${data.id}`}>
                            <h2 className="text-neutral-50 hover:underline underline-offset-2 font-semibold">
                                {data.name}
                            </h2>

                        </Link>
                    </PreviewModal>

                    <p className="text-neutral-500 text-xs sm:text-sm">
                        @{data.username}
                    </p>
                </div>
            </div>

            <Link href={`/user/${data.id}`}>
                <button className="bg-neutral-50 text-neutral-900 text-xs sm:text-sm md:text-base  border-none rounded-full py-1 px-4">
                    Detail
                </button>
            </Link>
        </div>
    );
}

export default CardList;