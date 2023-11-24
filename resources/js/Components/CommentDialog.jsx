import Icon from '@/Pages/twitter/commpoents/Icon'
import SidebarItem from '@/Pages/twitter/commpoents/SidebarItem'
import { Dialog, Transition } from '@headlessui/react'
import { router, usePage } from '@inertiajs/react'
import { Children, Fragment, useEffect, useRef, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import CommentFormDialog from './CommentFormDialog'

export default function CommentDialog({ children, textPost, user, createdAt, idPost, user_id, username, userImage = null, style, onClick, id }) {
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

  function closeModal(e) {
    // e.preventDefault()
    setIsOpen(false)
  }

  function openModal(e) {
    e.preventDefault()
    setIsOpen(true)
  }

  return (
    <>
      <div className="">
        <Icon id='comment' type='comment' style={style} onClick={openModal} />
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
                <Dialog.Panel className="w-full relative max-w-2xl transform overflow-y-auto rounded-2xl bg-black p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white flex justify-between items-center"
                  >
                    
                  </Dialog.Title>
                  
                  <div className='absolute top-3 right-3'>
                    <Icon type='close' onClick={closeModal} />
                  </div>
                  <CommentFormDialog  textPost={textPost} createdAt={createdAt} idPost={idPost} user={user} user_id={user_id} username={username} userImage={userImage} />
                  

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
