import { Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Button from "@/Pages/twitter/commpoents/Button";
import Icon from "@/Pages/twitter/commpoents/Icon";
import AvatarImage from "@/Pages/twitter/commpoents/avatarImage";


const CommentFormDialog = ({ 
        textPost, 
        user, 
        createdAt, 
        idPost, 
        user_id,
        type, 
        username, 
        userImage = null 
    }) => {

    const [text, setText] = useState('')
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const { errors, flash } = usePage().props
    const { auth } = usePage().props

    useEffect(() => {
        if (flash.success) {
            setLoading(false)
        }
        if (flash.error) {
            setLoading(false)
        }
        if (errors.text) {
            setLoading(false)
        }
        if (errors.image) {
            setLoading(false)
        }
    }, [flash])

    const postOnSUbmit = (e) => {
        e.preventDefault()
        setLoading(true)
        const data = {
            text: text,
            user_id: auth.user.id,
            post_id: idPost,
            recipent_id: user_id
        }

        if (image) {
            data.image = image
        }

        router.post('/comment', data, {
            forceFormData: true,
        })

        setText('')
        document.querySelector('#image-preview-comment').style.display = 'none'
        setImage(null)
        // document.querySelector('#container-form').classList.remove('items-start')
        document.querySelector('#container-form').classList.add('items-center')
    }

    const textOnInput = (e) => {
        if (e.target.value.trim() === '') {
            e.target.style.height = '32px'
        } else {
            e.target.style.height = (e.target.scrollHeight) + 'px'
        }
        setText(e.target.value)
    }

    const previewImage = (e) => {
        const image = document.querySelector('#image_comment')
        const imgPreview = document.querySelector('#image-preview-comment')


        const oFReader = new FileReader()
        oFReader.readAsDataURL(image.files[0])

        oFReader.onload = function (oFREvent) {
            imgPreview.src = oFREvent.target.result
            imgPreview.style.display = 'block'
        }

        setImage(e.target.files[0])
        document.querySelector('#container-form').classList.remove('items-center')
        // document.querySelector('#container-form').classList.remove('items-start')
    }

    const showTools = () => {
        document.querySelector('#recipent_username').classList.remove('hidden')
        document.querySelector('#icons').classList.remove('hidden')
    }

    return (
        <>
            {
                type !== 'without_recipent' && (
                    <div id="content" className="w-full h-auto p-4 pb-0 flex gap-2.5 items-start cursor-pointer">
                        <Link href={`/user/${user_id}`}>
                            {
                                userImage && (
                                    <AvatarImage img={userImage} />
                                )
                            }
                            {
                                !userImage && (
                                    <AvatarImage />
                                )
                            }
                        </Link>
                        <div className="w-[85%] sm:w-[90%] h-auto relative">
                            <div className="w-full h-auto flex items-center justify-between">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                                    <Link href={`/user/${user_id}`}>
                                        <h2 className="text-neutral-50 font-semibold text-sm sm:text-base md:text-lg hover:underline underline-offset-2">{user}</h2>
                                    </Link>
                                    <div className="flex gap-2 sm:gap-1.5 items-center">
                                        <p className="text-neutral-500 text-xs sm:text-sm"> @{username}</p>
                                        <p className="text-neutral-500 text-xs sm:text-sm">{createdAt}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="text-neutral-50 mt-1 sm:mt-0 whitespace-pre-wrap">
                                <p id="text" className="whitespace-pre-wrap line-clamp-3 text-sm sm:text-base" onClick={(e) => e.target.classList.toggle('line-clamp-3')}>
                                    {textPost}
                                </p>
                                <p className="text-neutral-500 text-xs sm:text-sm mt-1 md:mt-1.5">Replying to <span className="text-sky-600">@{username}</span></p>
                            </div>
                        </div>
                    </div>  
                )
            }

            {/* <div className="h-10 top-[87px] left-14 absolute border-l border-l-neutral-600"></div> */}

            {/* from */}
            <div className={type == 'without_recipent' ? 'px-3' : ''}>
                <div id="container-form" className={`p-4 w-full flex gap-1 h-auto ${type == 'without_recipent' ? 'border-t border-t-neutral-700 items-center px-0' : 'items-start'}`}>
                    <Link href={`/user/${auth.user.id}`}>
                        <AvatarImage img={auth.user.image ? auth.user.image : null}  />
                    </Link>
                    <div className="w-[87%] h-auto ml-2 bg-geen-500">
                        <form onSubmit={postOnSUbmit} className="relative">
                            <p className="text-xs sm:text-sm text-red-500">
                                {errors.text && <div>{errors.text}</div>}
                            </p>
                            <p className="text-xs sm:text-sm text-red-500">
                                {errors.image && <div>{errors.image}</div>}
                            </p>

                            <div className="absolute left-0 right-0 flex">
                                <ClipLoader className='m-auto' loading={loading} color="rgb(2 132 199)" size={50} />
                            </div>

                            {
                                type == 'without_recipent' && (
                                    <h1 id="recipent_username" className="text-sky-600 text-sm sm:text-base px-3 hidden">
                                        <span className="text-neutral-600">Replying to</span> @{username}
                                    </h1>
                                )
                            }

                            {/* input text */}
                            <textarea name="text" onInput={textOnInput} onClick={type == 'without_recipent' ? showTools : ''} placeholder="Post your reply" className="resize-none h-8 w-full overflow-hidden border-none focus:border-none outline-none focus:outline-none ring-none focus:ring-0 bg-transparent placeholder:text-neutral-500 md:placeholder:text-lg md:text-lg text-neutral-50" value={text}>

                            </textarea>
                            {/* <input type="text" name="text" value={text} onChange={textOnInput} className="border-none focus:border-none outline-none focus:outline-none ring-none focus:ring-0 bg-transparent placeholder:text-neutral-500 md:placeholder:text-lg md:text-lg text-neutral-50" placeholder="What Is Happening?" /> */}

                            {/*input image  */}
                            <img id="image-preview-comment" src="" style={{ display: 'none' }} className="w-full h-[320px] rounded-lg object-cover object-center" />
                            <input id="image_comment" name="image" className="w-0 h-0" type="file" onChange={previewImage} />

                            <div id="icons" className={`w-full h-auto flex items-center justify-between ${type !== 'without_recipent' ? 'py-2 mt-2' : 'hidden'}`}>
                                <div className="flex items-center pl-2">
                                    <label htmlFor="image_comment">
                                        <Icon type='img' />
                                    </label>
                                    <Icon type='gif' />
                                    <Icon type='emoji' />
                                    <Icon type='location' />
                                </div>

                                <Button type={`${text ? 'submit' : 'button'}`} style={text ? 'opacity-1 hover:bg-sky-500' : 'opacity-70 hover:cursor-not-allowed'}>
                                    Reply
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CommentFormDialog;