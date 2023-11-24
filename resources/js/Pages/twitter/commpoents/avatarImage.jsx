const AvatarImage = ({img = null , style, size}) => {
    return ( 
        <img src={img ? `/profile/${img}` : '/profile/avatar.png'} className={`${size ? size : 'w-8 h-8 sm:w-10 sm:h-10'} rounded-full bg-cover bg-center cursor-pointer bg-gray-400 ${style}`} />
    );
}
 
export default AvatarImage;