import Navbar from "@/Components/Navbar.jsx";
import { useEffect } from "react";
import Layout from "../twitter/layout/Layout";
import CardList from "@/Components/CardList";
import { Head } from "@inertiajs/react";


const Home = ({ 
        posts, 
        createdAt, 
        followers, 
        following,
        bio,
        cover,
        whoToFollow, 
        users, 
        whoToFollowBio, 
        whoToFollowCover, 
        whoToFollowFollowing, 
        whoToFollowFollowers }) => {

    useEffect(() => {
        document.querySelector('#main-content').addEventListener('scroll', () => {
            document.querySelector('#navbar').classList.toggle('sticky', document.querySelector('#main-content').scrollTop > 0)
        })
    }, [])

    return (
        <div className="w-full h-auto">
            <Head title="people" />
            <Layout whoToFollow={whoToFollow}>
                <div id="main-content" className="main-content h-full overflow-y-auto overflow-x-hidden">
                    <Navbar type='people' />
                    <div className="mt-16">
                        {
                            users && 
                            users.map(user => (
                                <CardList key={user.id} data={user} />
                            ))
                        }
                    </div>

                    
                </div>
            </Layout>
        </div>
    );
}

export default Home;