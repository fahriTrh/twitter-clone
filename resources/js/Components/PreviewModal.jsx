import AvatarImage from "@/Pages/twitter/commpoents/avatarImage"
import { Popover, Transition } from "@headlessui/react"
import { Link } from "@inertiajs/react"
import { Fragment, useEffect, useRef } from "react"

const PreviewModal = ({children, user, username, image, followers, following, bio, id, cover}) => {
  const buttonRef = useRef(null)
  const timeoutDuration = 200
  let timeout

  const closePopover = () => {
    return buttonRef.current?.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
        cancelable: true
      })
    )
  }

  const onMouseEnter = (open) => {
    clearTimeout(timeout)
    if (open) return
    return buttonRef.current?.click()
  }

  const onMouseLeave = (open) => {
    if (!open) return
    timeout = setTimeout(() => closePopover(), timeoutDuration)
  }

  useEffect(() => {
    // console.log(followers);
  }, [])

  return (
    <div className="">
      <Popover className="relative">
        {({ open }) => {
          return (
            <>
              <div onMouseLeave={onMouseLeave.bind(null, open)}>
                <Popover.Button
                  ref={buttonRef}
                  onMouseEnter={onMouseEnter.bind(null, open)}
                  onMouseLeave={onMouseLeave.bind(null, open)}
                  className='outline-none border-0 focus:border-none focus:outline-none ring-0 focus:ring-0 hover:border-none hover:outline-none hover:ring-0'
                  >
                {children}
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200 delay-[600ms]"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute z-10 w-screen max-w-xs px-4 mt-0 transform sm:px-0">
                    <div
                      className="overflow-hidden rounded-xl shadow-lg ring-1 ring-black ring-opacity-5"
                      onMouseEnter={onMouseEnter.bind(null, open)}
                      onMouseLeave={onMouseLeave.bind(null, open)}
                    >
                      <div className=" bg-black rounded-xl overflow-hidden text-neutral-100 absolute shadow-sm z-50" style={{ boxShadow: '0 0 6px 0 rgb(255 255 255 / 0.7)' }}>
                        <div className="w-60 sm:w-64 md:w-[280px]">
                            <div className="w-full h-28 bg-neutral-800 relative">
                                {
                                  cover && (
                                    <img src={`/cover/${cover}`} className="w-full h-full relative obhect-cover object-center" />
                                  )
                                }
                                {/* <div className="absolute -bottom-8 left-2 h-16 w-16 rounded-full bg-red-500 border-2 border-black">

                                </div> */}
                                <Link href={`/user/${id}`}>
                                  <AvatarImage img={image} style='absolute -bottom-5 md:-bottom-8 left-2' size='h-10 w-10 md:h-16 md:w-16 z-10' />
                                </Link>
                            </div>
                            <div className="mt-1.5 px-3 flex justify-end">
                                <Link href={`/user/${id}`}>
                                  <button className="px-3 smpx-4 py-0.5 sm:py-1 rounded-full bg-white text-neutral-900 text-xs sm:text-sm font-semibold">Detail</button>
                                </Link>
                            </div>
                            <div className="mt-0.5 px-3 flex justify-start">
                                <div>
                                    <Link href={`/user/${id}`}>
                                      <h2 className="text-neutral-50 hover:underline underline-ofset-3">{user}</h2>
                                    </Link>
                                    <p className="text-neutral-500 text-xs sm:text-sm">@{username}</p>
                                </div>
                            </div>
                            <div className="my-2 px-3">
                                <p className="text-neutral-50 text-xs sm:text-sm">{bio}</p>
                            </div>

                            <div className="my-3 px-3 flex items-center gap-2 sm:gap-3">
                                
                                <Link href={`/user/${id}/followers`}>
                                  <p className="text-neutral-500 text-xs sm:text-sm hover:underline underline-ofset-3">
                                      {followers.length} Followers
                                  </p>
                                </Link>
                                <Link href={`/user/${id}/following`}>
                                  <p className="text-neutral-500 text-xs sm:text-sm hover:underline underline-ofset-3">
                                      {following.length} Following
                                  </p>
                                </Link>
                            </div>
                        </div>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </div>
            </>
          )
        }}
      </Popover>
    </div>
  )
}

export default PreviewModal
