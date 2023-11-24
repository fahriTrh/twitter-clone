import { Popover } from '@headlessui/react'
import Icon from './Icon';
const MyPopover = ({ children }) => {
    return (
        <Popover className="relative">
            <Popover.Button className='border-none focus:border-none outline-none focus:outline-none'>
                <Icon type='option' />
            </Popover.Button>

            <Popover.Panel className="absolute top-0 right-0 z-10">
                {
                    children
                }
            </Popover.Panel>
        </Popover>
    );
}

export default MyPopover;