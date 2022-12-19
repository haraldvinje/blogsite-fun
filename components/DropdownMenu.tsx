import { ReactNode, Fragment, Children } from 'react'
import { Menu, Transition } from '@headlessui/react'

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
        <Menu.Button>{head}</Menu.Button>
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
        <Menu.Items
          className="absolute right-0 mt-2 origin-top-right rounded-md border-2 
                    border-gray bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
        >
          {Children.map(childrenArray, (child: ReactNode) => {
            return (
              <Menu.Item>
                <div className="block px-4 py-2 text-sm text-black">{child}</div>
              </Menu.Item>
            )
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
