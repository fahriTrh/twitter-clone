import { useEffect, useState } from "react";
import FollowCard from "../commpoents/FollowCard";
import InputSearch from "../commpoents/InputSearch";
import SidebarItem from "../commpoents/SidebarItem";
import mainContentAndNavWidthSetter from "../functions/mainContentAndWidthSetter";
import { Link, usePage } from "@inertiajs/react";
import PostDialog from "@/Components/PostDialog";
import { Popover } from "@headlessui/react";
import SearchModal from "@/Components/SearchModal";
import Modal from "@/Components/Modal";


const Layout = ({ children, param, whoToFollow }) => {

    const { auth } = usePage().props
    const [isOpen, setIsOpen] = useState(false)
    const [data, setData] = useState(null)

    useEffect(() => {
        mainContentAndNavWidthSetter(param)
        window.onresize = () => {
            mainContentAndNavWidthSetter(param)
        }
    }, [param])

    const onSearch = (e) => {
        setIsOpen(true)
        if (e.target.value.trim() !== '') {
            fetch(`/search?q=${e.target.value}`)
                .then(results => results.json())
                .then(results => {
                    if (results) {
                        setData(results)
                    }
                })
        } else {
            setIsOpen(false)
        }
    }

    return (
        <div className="fixed flex gap-1 justify-between h-full w-full" onClick={() => setIsOpen(false)}>
            <div id="side-left" className="w-auto h-full px-3 py-1 md:pl-16 lg:pl-10 lg:px-10 xl:px-20 border-r border-r-neutral-700">
                <Link href="/twitter">
                    <SidebarItem type='bird' />
                </Link>
                <Link href="/twitter">
                    <SidebarItem type='home' />
                </Link>
                <SidebarItem type='search' />
                <SidebarItem type='bell' />
                <SidebarItem type='message' />
                <SidebarItem type='bookmarks' />
                <SidebarItem type='community' />
                <Link href={`/user/${auth.user.id}`}>
                    <SidebarItem type='profile' />
                </Link>
                <PostDialog />
            </div>
            {
                children
            }
            <div id="search" className="hidden fixed right-0 sm:block w-auto h-auto justify-self-end px-3 py-1 md:pr-16 lg:px-6 lg:pr-16 xl:pl-6 xl:pr-6 z-50">
                <InputSearch onChange={onSearch} />
                {
                    <SearchModal data={data} isOpen={isOpen} />
                }
            </div>
            <div id="side-right" className="hidden sm:block w-auto h-full justify-self-end px-3 py-1 md:pr-16 lg:px-6 lg:pr-16 xl:pl-6 xl:pr-6 border-l border-l-neutral-700 overflow-auto">
                <div className="mt-16 hidden lg:block md:w-80 xl:w-[380px] mx-auto bg-gray-600/30 p-4 rounded-xl text-white">
                    <h2 className="text-xl font-extrabold mb-6">Who to follow</h2>
                    {
                        whoToFollow &&
                        whoToFollow.map(user => (
                            <FollowCard key={user.id} user={user} />
                        ))
                    }
                    <div className="mt-3 flex justify-center">
                        <Link href="/people">
                            <p className="text-xs sm:text-sm text-sky-600 hover:underline underline-ofset-4 cursor-pointer">Show More</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Layout;