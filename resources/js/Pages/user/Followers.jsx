import Navbar from "@/Components/Navbar";
import Layout from "../twitter/layout/Layout";
import { useEffect } from "react";
import UserProfile from "@/Components/UserProfile";
import MyDialog from "@/Components/ProfileDialog";
import { Toaster, toast } from "sonner";
import { Head, usePage } from "@inertiajs/react";
import FollowersMain from "@/Components/FollowersMain";

const Index = ({ user, createdAt, whoToFollow, followers, followings }) => {
    const {flash} = usePage().props|

    useEffect(() => {
        document.querySelector('#main-content').addEventListener('scroll', () => {
            document.querySelector('#navbar').classList.toggle('sticky', document.querySelector('#main-content').scrollTop > 0)
        })
    },[])

    return ( 
        <div className="w-full h-auto">
            <Head title={`${user.name}'s followers`} />
            <Layout param={6} whoToFollow={whoToFollow}>
                <div id="main-content" className="main-content h-full overflow-y-auto overflow-x-hidden">
                    <Navbar type='followers' name={user.name} followers={user.followersUpdated.length}  />
                    <FollowersMain followers={user.followersUpdated} />
                </div>
            </Layout>
        </div>
    );
}
 
export default Index;