import React from 'react'

interface CapsuleProps{
    item: string,
    className?: string,
}

const Capsule:React.FC<CapsuleProps> = ({item, className}) => {
  return (
    <div className={`rounded-full min-w-[50px] w-fit font-medium px-3 text-sm py-1 dark:text-white shadow-sm transition-colors ease-linear  ${className} `}>
      {item}
    </div>
  )
}

export default Capsule
