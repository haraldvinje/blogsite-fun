import React from 'react'

interface Props {
    show: boolean
}

const Loader = ({ show }: Props) => {
    return show ? (
        <div className="flex justify-center items-center">
            <div className="animate-spin border-4 border-r-blue-600 w-8 h-8 mr-3 rounded-full"></div>
        </div>
    ) : null
}

export default Loader
