const ShowPost = ({posts}) => {
    return (
        <div className="w-full py-4 text-center text-sky-700 transition text-sm md:font-semibold">
            <span className="hover:text-sky-900 cursor-not-allowed">
                Showing {posts} Posts
            </span>
        </div>
    );
}

export default ShowPost;