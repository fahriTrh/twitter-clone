import mainContentAndNavWidthSetter from "@/Pages/twitter/functions/mainContentAndWidthSetter";
import { useEffect } from "react";
import CardList from "./CardList";

const FollowingMain = ({following}) => {
    
    useEffect(() => {
        if (following) {
            following.forEach(follow => {
                mainContentAndNavWidthSetter(6)
            })
        }
    }, [following])

    return ( 
        <div className="w-full h-auto pt-16">
            {
                following && following.length !== 0 ?
                following.map(follow => (
                    <CardList key={follow.id} data={follow} />
                )) : (
                    <h1 className="text-center text-neutral-500 md:text-lg mt-3">Not Found</h1>
                )
            }
        </div>
    );
}
 
export default FollowingMain;