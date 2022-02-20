import React, { useRef, useState, ReactNode } from 'react'
import FadeIn from 'react-fade-in'

import { useOutsideClick } from '../lib/hooks'

interface Props {
    head: ReactNode
    children: ReactNode
    className?: string
}

export const DropdownMenu = ({ head, children, className }: Props) => {
    const [show, setShow] = useState(false)
    const wrapperRef = useRef(null)
    useOutsideClick(wrapperRef, () => setShow(false))

    const toggle = () => {
        setShow(!show)
    }

    return (
        <div ref={wrapperRef}>
            <button onClick={toggle}>
                {head}
            </button>
            {show ? (
                <FadeIn transitionDuration={200}>
                    <div onClick={() => setShow(false)}
                        className={`absolute min-w-min z-50 my-4 text-base list-none bg-white rounded divide-y
                            divide-gray-100 shadow-lg dark:bg-gray-700 dark:divide-gray-600 ${className}`}
                    >
                        {children}
                    </div>
                </FadeIn>
            ) : (
                <></>
            )}
        </div>
    )
}
