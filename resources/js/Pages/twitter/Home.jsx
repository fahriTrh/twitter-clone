import Navbar from "@/Components/Navbar.jsx";
import Layout from "./layout/Layout";
import PostForm from "./commpoents/PostForm";
import ShowPost from "./commpoents/ShowPost";
import PostCard from "./commpoents/PostCard";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

import mainContentAndNavWidthSetter from "./functions/mainContentAndWidthSetter";
import { Head, Link, router, usePage } from "@inertiajs/react";
import LoadPage from "@/Components/LoadPage";


const Home = ({ posts, createdAt, followers, following, whoToFollow }) => {
    const { flash, auth } = usePage().props
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (posts) {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        if (posts) {
            posts.map((post, index) => {
                mainContentAndNavWidthSetter(false)
            })
        }

        if (flash.success) {
            toast.success(flash.success)
        }

        if (flash.error) {
            toast.error(flash.error)
        }
    }, [flash])

    useEffect(() => {
        document.querySelector('#main-content').addEventListener('scroll', () => {
            document.querySelector('#navbar').classList.toggle('sticky', document.querySelector('#main-content').scrollTop > 0)
        })
    }, [])

    // const logout = (e) => {
    //     e.preventDefault()
    //     router.post('/logout')
    // }

    return (
        <div className="w-full h-auto">
            <Layout whoToFollow={whoToFollow}>
                <div id="main-content" className="main-content h-full overflow-y-auto overflow-x-hidden">
                    <Head title="Home" />
                    <Navbar />
                    <PostForm />
                    {/* <form onSubmit={logout}>
                        <button type="submit">logout</button>
                    </form> */}
                    <ShowPost posts={posts.length} />
                    <Toaster richColors />
                    {
                        posts &&
                        posts.map((post, index) => (
                                <PostCard
                                    key={post.id}
                                    idPost={post.id}
                                    user={post.user.name}
                                    cover={post.user.cover}
                                    text={post.text}
                                    bio={post.user.bio}
                                    image={post.image ? true : false}
                                    imageUrl={post.image ? post.image : ''}
                                    user_id={post.user_id}
                                    username={post.user.username}
                                    userImage={post.user.image}
                                    createdAt={createdAt[index]}
                                    likes={post.likes}
                                    comments={post.comments}
                                    followers={post.user.followers}
                                    following={post.user.following}
                                />
                        ))
                    }
                </div>
                <LoadPage isLoading={isLoading} />
            </Layout>
        </div>
    );
}

export default Home;