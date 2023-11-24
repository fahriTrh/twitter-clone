import Icon from '@/Pages/twitter/commpoents/Icon'
import PostFormSidebar from '@/Pages/twitter/commpoents/PostFormSidebar'
import SidebarItem from '@/Pages/twitter/commpoents/SidebarItem'
import { Dialog, Transition } from '@headlessui/react'
import { router, usePage } from '@inertiajs/react'
import { Children, Fragment, useEffect, useRef, useState } from 'react'
import { ClipLoader } from 'react-spinners'

export default function ViewImage({ children, image }) {
  const {auth, errors} = usePage().props
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { flash } = usePage().props

  useEffect(() => {
    if (flash.success) {
      setLoading(false)
      setIsOpen(false)
    }
  },[flash])

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className="" onClick={openModal}>
        {
            children
        }
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
                <Dialog.Panel className="w-auto h-auto">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white flex justify-between items-center"
                  >
                    
                  </Dialog.Title>
                  {
                    image ? (
                        <img src={image} className='w-full sm:max-w-xs md:max-w-sm lg:max-w-lg lg:h-96 h-72 md:h-80 object-cover object-center' />
                    ) : (
                        <ClipLoader className='m-auto' loading={true} color="rgb(2 132 199)" size={50} />
                    )
                  }

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
