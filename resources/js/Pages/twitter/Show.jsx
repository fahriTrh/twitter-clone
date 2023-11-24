import Navbar from "@/Components/Navbar.jsx";
import Layout from "./layout/Layout";
import { useEffect, useState } from "react";

import { Head, router, usePage } from "@inertiajs/react";
import PostCard from "./commpoents/PostCard";
import mainContentAndNavWidthSetter from "./functions/mainContentAndWidthSetter";
import CommentCard from "./commpoents/CommentCard";
import { Toaster, toast } from "sonner";
import CommentFormDialog from "@/Components/CommentFormDialog";


const Show = ({ 
    post, 
    createdAt, 
    comments, 
    commentCreatedAt, 
    bio, 
    cmtFollowers, 
    cmtFollowing, 
    whoToFollow, 
    whoToFollowFollowers, 
    whoToFollowFollowing, 
    whoToFollowBio, 
    whoToFollowCover,
    }) => {
        
    const { flash, auth } = usePage().props

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success)
        }

        if (flash.error) {
            toast.error(flash.error)
        }
    }, [flash])

    useEffect(() => {
        // console.log(latestComments);
        const array = [1,2,3,4,5]

        array.map(arr => {
            mainContentAndNavWidthSetter(8)
        })

        document.querySelector('#main-content').addEventListener('scroll', () => {
            document.querySelector('#navbar').classList.toggle('sticky', document.querySelector('#main-content').scrollTop > 0)
        })
    }, [])

    const logout = (e) => {
        e.preventDefault()
        router.post('/logout')
    }

    return (
        <div className="w-full h-auto">
            <Head title={`${post.user.name}'s Tweet`}/>
            <Layout whoToFollow={whoToFollow}>
                <div id="main-content" className="main-content h-full overflow-y-auto overflow-x-hidden">
                    <Toaster richColors />
                    <Navbar type='tweet' name={post.user.name} />
                    {
                        post && 
                        (
                            <PostCard 
                                isShow={true}
                                style='mt-12'
                                key={post.id} 
                                idPost={post.id} 
                                user={post.user.name} 
                                text={post.text} image={post.image ? true : false} 
                                imageUrl={post.image ? post.image : ''} 
                                user_id={post.user.id} 
                                username={post.user.username} u
                                userImage={post.user.image}
                                createdAt={createdAt}
                                comments={post.comments}
                                likes={post.likes}
                                followers={post.user.followers}
                                following={post.user.following}
                                />
                        )
                    }
                    <CommentFormDialog 
                        type='without_recipent'
                        username={post.user.username}
                        user_id={post.user.id}
                        idPost={post.id}
                         />
                    {
                        post.comments &&
                        post.comments.map((comment, index) => (
                            <CommentCard
                                key={comment.id}
                                user={comment.user.name}
                                username={comment.user.username}
                                text={comment.text}
                                userImage={comment.user.image ? comment.user.image : false}
                                imageUrl={comment.image}
                                createdAt={commentCreatedAt[index]}
                                user_id={comment.user.id}
                                commentId={comment.id}
                                bio={comment.user.bio}
                                cover={comment.user.cover}
                                followers={comment.user.followers}
                                following={comment.user.following}
                                recipentUsername={post.user.username}
                            />
                        )).reverse()
                    }
                </div>
            </Layout>
        </div>
    );
}

export default Show;