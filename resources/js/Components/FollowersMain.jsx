import mainContentAndNavWidthSetter from "@/Pages/twitter/functions/mainContentAndWidthSetter";
import { useEffect } from "react";
import CardList from "./CardList";

const FollowersMain = ({followers}) => {
    
    useEffect(() => {
        if (followers) {
            followers.forEach(follower => {
                mainContentAndNavWidthSetter(6)
            })
        }
    }, [followers])

    return ( 
        <div className="w-full h-auto pt-16">
            {
                followers && followers.length !== 0 ?
                followers.map(follower => (
                    <CardList key={follower.id} data={follower} />
                )): (
                    <h1 className="text-center text-neutral-500 md:text-lg mt-3">Not Found</h1>
                )
            }
        </div>
    );
}
 
export default FollowersMain;