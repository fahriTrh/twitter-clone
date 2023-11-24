const LoadPage = ({isLoading = true}) => {
    return ( 
        <div className={!isLoading ? 'hidden' : 'fixed h-screen w-screen bg-black z-[60] flex justify-center items-center'}>
            <img src="/twitter.png" width={60} height={60} />
        </div>
    );
}
 
export default LoadPage;