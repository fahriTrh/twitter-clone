import Icon from "@/Pages/twitter/commpoents/Icon";
import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

const Navbar = ({ style, type, name, tweets = 0, followers, following  }) => {

    const {page} = usePage().props

    const back = () => {
        window.history.back()
    }

    return (
        <div id="navbar" className={`navbar fixed top-0 h-auto flex justify-start border-b border-b-neutral-700 z-30 bg-black ${style}`}>
            <div className={`-full w-1/2 cursor-pointer  flex items-center ${type !== 'user' && type !== 'followers' && type !== 'following' && type !== 'people' && type !== 'tweet' ? 'hover:bg-neutral-700/40' : ''}`}>
                <h2 className={`text-neutral-100 md:text-lg font-semibold  flex flex-col justify-center items-center gap-2.5 ${type == 'user' || type == 'followers' || type == 'following' || type == 'people' || type == 'tweet' ? 'py-0.5' : 'm-auto pt-3'}`}>
                    {
                        type == 'user' && (
                            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                                <Icon type='back' onClick={back} />
                                <div className="flex flex-col">
                                    <span>{name}</span>
                                    {
                                        tweets !== 0 && (
                                            <span className="text-xs sm:text-sm text-neutral-500">{tweets} Tweets</span>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                    {
                        type == 'followers' && (
                            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                                <Icon onClick={back} type='back' />
                                <div className="flex flex-col">
                                    <span>{name}</span>
                                    {
                                        followers !== 0 && (
                                            <span className="text-xs sm:text-sm text-neutral-500">{followers} Followers</span>
                                        )
                                    }
                                    {
                                        followers == 0 && (
                                            <span className="text-xs sm:text-sm text-neutral-500">Followers</span>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                    {
                        type == 'following' && (
                            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                                <Icon type='back' onClick={back} />
                                <div className="flex flex-col">
                                    <span>{name}</span>
                                    {
                                        following !== 0 && (
                                            <span className="text-xs sm:text-sm text-neutral-500">{following} Following</span>
                                        )
                                    }
                                    {
                                        following == 0 && (
                                            <span className="text-xs sm:text-sm text-neutral-500">Following</span>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                    {
                        type == 'tweet' && (
                            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                                <Icon type='back' onClick={back} />
                                <div className="flex flex-col">
                                    {/* <span>{name}'s</span> */}
                                    <span className="text-sm sm:text-base text-neutral-500">Tweet</span>
                                </div>
                            </div>
                        )
                    }
                    {
                        type == 'people' && (
                            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                                <Icon type='back' onClick={back} />
                                <div className="flex flex-col">
                                     <span className="text-xs sm:text-sm text-neutral-500">{following} People</span>
                                </div>
                            </div>
                        )
                    }
                    {
                        type !== 'user' && type !== 'followers' && type !== 'following' && type !== 'people' && type !== 'tweet' && (
                            <>
                                <span>Home</span>
                                <span className="w-12 h-1 bg-sky-600 rounded-md m-auto"></span>
                            </>
                        )
                    }
                </h2>
            </div>
        </div>
    );
}

export default Navbar;