import { Link, router, usePage } from "@inertiajs/react";
import Button from "./Button";
import Icon from "./Icon";
import AvatarImage from "./avatarImage";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";


const PostForm = () => {

    const [text, setText] = useState('')
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const { errors, flash } = usePage().props
    const {auth} = usePage().props

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
    },[flash])

    const postOnSUbmit = (e) => {
        e.preventDefault()
        setLoading(true)
        const data = {
            text: text,
        }

        if (image) {
            data.image = image
        }

        router.post('/twitter', data, {
            forceFormData: true,
        })

        setText('')
        document.querySelector('#image-preview').style.display = 'none'
        setImage(null)
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
        const image = document.querySelector('#image')
        const imgPreview = document.querySelector('#image-preview')


        const oFReader = new FileReader()
        oFReader.readAsDataURL(image.files[0])

        oFReader.onload = function (oFREvent) {
            imgPreview.src = oFREvent.target.result
            imgPreview.style.display = 'block'
        }

        setImage(e.target.files[0])

    }

    return (
        <div className="p-4 w-full flex items-start gap-1 mt-16 h-auto border-b border-b-neutral-700">
            <Link href={`/user/${auth.user.id}`} className="border-none focus:border-none outline-none focus:outline-none ring-0 focus:ring-0">
                <AvatarImage img={auth.user.image ? auth.user.image : null} style='hidden sm:block'  />
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

                    {/* input text */}
                    <textarea name="text" onInput={textOnInput} placeholder="What Is Happening?" className="resize-none h-8 w-full overflow-hidden border-none focus:border-none outline-none focus:outline-none ring-none focus:ring-0 bg-transparent placeholder:text-neutral-500 md:placeholder:text-lg md:text-lg text-neutral-50" value={text}>

                    </textarea>
                    {/* <input type="text" name="text" value={text} onChange={textOnInput} className="border-none focus:border-none outline-none focus:outline-none ring-none focus:ring-0 bg-transparent placeholder:text-neutral-500 md:placeholder:text-lg md:text-lg text-neutral-50" placeholder="What Is Happening?" /> */}

                    {/*input image  */}
                    <img id="image-preview" src="" style={{ display: 'none' }} className="w-full h-[320px] rounded-lg object-cover object-center" />
                    <input id="image" name="image" className="w-0 h-0" type="file" onChange={previewImage} />

                    <div className="text-sky-600 w-[max-content] h-auto ml-2 flex items-center gap-1 py-1 px-2 rounded-full cursor-not-allowed hover:bg-sky-700/20 transition-all">
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="fill-sky-600 w-3 h-3 md:w-5 md:h-5"
                        >
                            <g>
                                <path d="M12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm-.25 10.48L10.5 17.5l-2-1.5v-3.5L7.5 9 5.03 7.59c1.42-2.24 3.89-3.75 6.72-3.84L11 6l-2 .5L8.5 9l5 1.5-1.75 1.73zM17 14v-3l-1.5-3 2.88-1.23c1.17 1.42 1.87 3.24 1.87 5.23 0 1.3-.3 2.52-.83 3.61L17 14z" />
                            </g>
                        </svg>
                        <span className="text-sm md:text-sm font-semibold">Everyone can reply</span>
                    </div>
                    <div className="w-full h-auto border-t border-t-neutral-700 py-2 mt-2 flex items-center justify-between">
                        <div className="flex items-center pl-2">
                            <label htmlFor="image">
                                <Icon type='img' />
                            </label>
                            <Icon type='gif' />
                            <Icon type='emoji' />
                            <Icon type='location' />
                        </div>

                        <Button type={`${text ? 'submit' : 'button'}`} style={text ? 'opacity-1 hover:bg-sky-500' : 'opacity-70 hover:cursor-not-allowed'}>
                            Post
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PostForm;