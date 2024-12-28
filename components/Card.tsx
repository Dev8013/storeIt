import Link from 'next/link'
import { Models } from 'node-appwrite'
import React from 'react'
import Thumnail from './Thumnail'
import { convertFileSize } from '@/lib'
import FormattedDateTime from './FormattedDateTime'

const Card = ({file}: {file: Models.Document}) => {
  return (
    <Link href={file.url} target='_blank' className='file-card'>
      <div className='flex justify-between'>
        <Thumnail type={file.type} extension={file.extension} url={file.url} className='!size-20' imageClassName='!size-11'/>
        <div className='flex flex-col items-end justify-between'>
          Action Drop Down
          <p className='body-1'>{convertFileSize(file.size)}</p>
        </div>
      </div>
      <div className='file-card-details'>
        <p className='subtitle-2 line-clamp-1'>  {file.name}</p>
        <FormattedDateTime date={file.$createdAt} className="body-2 text-light-100"/>
        <p className='captions line-clamp-1 text-light-200'>By: {file.ownerId.fullName}</p>
      </div>
    
    </Link>
  )
}

export default Card
