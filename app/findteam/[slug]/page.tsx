import React from 'react'

const page = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      {params.slug}
      
    </div>
  )
}

export default page
