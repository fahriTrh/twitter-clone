import Navbar from "@/Components/Navbar";
import Layout from "../twitter/layout/Layout";
import { useEffect } from "react";
import UserProfile from "@/Components/UserProfile";
import MyDialog from "@/Components/ProfileDialog";
import { Toaster, toast } from "sonner";
import { Head, usePage } from "@inertiajs/react";

const Index = ({ user, posts, createdAt, whoToFollow }) => {
    const {flash} = usePage().props
    
    useEffect(() => {
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
    },[])

    return ( 
        <div className="w-full h-auto">
            <Head title={user.name} />
            <Layout param={6} whoToFollow={whoToFollow}>
                <div id="main-content" className="main-content h-full overflow-y-auto overflow-x-hidden">
                    <Navbar type='user' name={user.name} tweets={user.posts.length} />
                    <UserProfile user={user} createdAt={createdAt}  />
                    <Toaster richColors />
                </div>
            </Layout>
        </div>
    );
}
 
export default Index;