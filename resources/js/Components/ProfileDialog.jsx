import Icon from '@/Pages/twitter/commpoents/Icon'
import { Dialog, Transition } from '@headlessui/react'
import { router, usePage } from '@inertiajs/react'
import { Children, Fragment, useEffect, useRef, useState } from 'react'
import { ClipLoader } from 'react-spinners'

export default function ProfileDialog({ children }) {
  const {auth, errors} = usePage().props
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState(auth.user.name)
  const [bio, setBio] = useState(auth.user.bio ? auth.user.bio : '')
  const [location, setLocation] = useState(auth.user.location ? auth.user.location : '')
  const [website, setWebsite] = useState(auth.user.website ? auth.user.website : '')
  const [image, setImage] = useState('')
  const [username, setUsername] = useState(auth.user.username ? auth.user.username : '')
  const [cover, setCover] = useState('')
  const [loading, setLoading] = useState(false)
  const { flash } = usePage().props

  useEffect(() => {
    // console.log(auth.user.username);
    if (flash.success) {
      setLoading(false)
      setIsOpen(false)
    }
  },[flash])

  useEffect(() => {
    if (errors) {
      setLoading(false)
    }
  }, [errors])

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const previewProfile = (e) => {
    const image = document.querySelector('#profile')
    const imgPreview = document.querySelector('#profile-preview')


    const oFReader = new FileReader()
    oFReader.readAsDataURL(image.files[0])

    oFReader.onload = function (oFREvent) {
        imgPreview.src = oFREvent.target.result
    }

    setImage(e.target.files[0])
  }

  const previewCover = (e) => {
    const image = document.querySelector('#cover')
    const imgPreview = document.querySelector('#cover-preview')


    const oFReader = new FileReader()
    oFReader.readAsDataURL(image.files[0])

    oFReader.onload = function (oFREvent) {
      imgPreview.style.opacity = 1
      imgPreview.src = oFREvent.target.result
    }

    setCover(e.target.files[0])
  }

  const submit = (e) => {
    e.preventDefault()
    setLoading(true)

    const data = {
      _method: 'put',
      name: name,
      bio: bio,
      location: location,
      username: username,
      website: website,
    }

    if (image) {
      data.image = image
    }

    if (cover) {
      data.cover = cover
    }

    if (auth.user.image !== null) {
      data.oldImage = auth.user.image
    }

    if (auth.user.cover) {
      data.oldCover = auth.user.cover
    }

    // console.log(data);

    router.post(`/user/${auth.user.id}`, data, {
      forceFormData: true,
    })
  }

  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={openModal}
          className="border border-neutral-500 text-neutral-50 text-sm font-semibold sm:text-base px-4 py-1.5 rounded-full bg-black hover:bg-neutral-800"
        >
          {children}
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[rgba(91,112,131,.4)]" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-y-auto rounded-2xl bg-black p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white flex justify-between items-center"
                  >
                    <div className='flex items-center gap-1'>
                      <Icon type='close' style='-mt-10 -ml-4' onClick={closeModal} />
                      <span>Edit Profile</span>
                    </div>
                    <div className="">
                      <button
                        onClick={submit}
                        className="inline-flex justify-center rounded-full border border-transparent bg-blue-100 px-4 py-1.5 text-sm sm:text-base font-semibold text-neutral-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Save
                      </button>
                    </div>
                  </Dialog.Title>
                  <div className="mt-2">
                    <form >
                      <div className={`w-full h-56 relative flex`}>
                        <img id='cover-preview' src={auth.user.cover ? `/cover/${auth.user.cover}` : ''} className={`w-full h-full object-cover object-center rounded-xl absolute ${auth.user.cover ? '' : 'opacity-0'}`} />
                        {
                          loading && (
                            <div className='absolute flex w-full h-full bg-neutral-800/70'>
                              <ClipLoader size={80} color='rgb(2 132 199)' loading={loading} className='m-auto' />
                            </div>
                          )
                        }
                        <label htmlFor="cover" className='m-auto relative z-10'>
                          <Icon type='camera' />
                        </label>
                        <input id='cover' type="file" className='h-0 w-0' onChange={previewCover} />

                        <div className={`absolute w-28 h-28 rounded-full bg-cover bg-center -bottom-14 flex overflow-hidden`}>
                          <img id='profile-preview' src={auth.user.image ? `/profile/${auth.user.image}` : '/profile/avatar.png'} alt={auth.user.name} className='w-full h-full absolute object-cover object-center' />
                          <label htmlFor="profile" className='m-auto relative z-10'>
                            <Icon type='camera' />
                          </label>
                          <input id='profile' type="file" className='h-0 w-0' onChange={previewProfile} />
                        </div>
                      </div>

                      <div className='mt-20'>
                        <input type="text" className='w-full h-14 rounded-md bg-black outline-none focus:outline-none ring-0 focus:ring-0 border border-neutral-700 focus:border-sky-700 text-neutral-50 sm:text-lg sm:placeholder:text-lg placeholder:text-neutral-700' onChange={(e) => setName(e.target.value)} placeholder='Name' value={name} />
                        {errors.name && (
                          <p className='text-xs sm:text-sm mt-0.5 text-[red]'>{errors.name}</p>
                        )}
                      </div>

                      <div className='mt-4'>
                        <input type="text" className='w-full h-14 rounded-md bg-black outline-none focus:outline-none ring-0 focus:ring-0 border border-neutral-700 focus:border-sky-700 text-neutral-50 sm:text-lg sm:placeholder:text-lg placeholder:text-neutral-700' onChange={(e) => setUsername(e.target.value)} placeholder='Username' value={username} />
                        {errors.username && (
                          <p className='text-xs sm:text-sm mt-0.5 text-[red]'>{errors.username}</p>
                        )}
                      </div>

                      <div className='mt-4'>
                        <input type="text" className='w-full h-24 rounded-md bg-black outline-none focus:outline-none ring-0 focus:ring-0 border border-neutral-700 focus:border-sky-700 text-neutral-50 sm:text-lg sm:placeholder:text-lg placeholder:text-neutral-700' onChange={(e) => setBio(e.target.value)} placeholder='Bio' value={bio} />
                        {errors.bio && (
                          <p className='text-xs sm:text-sm mt-0.5 text-[red]'>{errors.bio}</p>
                        )}
                      </div>

                      <div className='mt-4'>
                        <input type="text" className='w-full h-14 rounded-md bg-black outline-none focus:outline-none ring-0 focus:ring-0 border border-neutral-700 focus:border-sky-700 text-neutral-50 sm:text-lg sm:placeholder:text-lg placeholder:text-neutral-700' onChange={(e) => setLocation(e.target.value)} placeholder='Location' value={location} />
                        {errors.location && (
                          <p className='text-xs sm:text-sm mt-0.5 text-[red]'>{errors.location}</p>
                        )}
                      </div>

                      <div className='mt-4'>
                        <input type="text" className='w-full h-14 rounded-md bg-black outline-none focus:outline-none ring-0 focus:ring-0 border border-neutral-700 focus:border-sky-700 text-neutral-50 sm:text-lg sm:placeholder:text-lg placeholder:text-neutral-700' onChange={(e) => setWebsite(e.target.value)} placeholder='Website' value={website} />
                        {errors.website && (
                          <p className='text-xs sm:text-sm mt-0.5 text-[red]'>{errors.website}</p>
                        )}
                      </div>

                    </form>
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
