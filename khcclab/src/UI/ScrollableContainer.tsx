import React from 'react'

export const ScrollableContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full overflow-y-scroll flex flex-col gap-3 px-3 '>
      {children}
    </div>
  )
}
