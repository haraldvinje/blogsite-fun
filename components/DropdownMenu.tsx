import React, { ReactNode, Fragment, Children } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ReactElement } from 'react-markdown/lib/react-markdown'

interface Props {
    head: ReactNode
    children: ReactNode
    className?: string
}

export const DropdownMenu = ({ head, children }: Props) => {

    const childrenArray = Children.toArray(children)

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button>
                    {head}
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right border-2 border-gray absolute right-0 mt-2 w-42 
                    rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                >   
                    {Children.map(childrenArray, (child: ReactElement) => {
                        return (
                            <Menu.Item>
                                <div className='text-gray-700 block px-4 py-2 text-sm'>
                                    {child}
                                </div>
                            </Menu.Item>
                    )})}
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
