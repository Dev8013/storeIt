'use client'
import React, { MouseEvent, useState } from 'react'
import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { Button } from './ui/button'
import { cn, convertFileToUrl, getFileType } from '@/lib'
import Image from 'next/image'
import Thumnail from './Thumnail'

interface Props {
  ownerId: string;
  accountId: string;
  className: string;
}

const FileUploader = ({ownerId, accountId, className}: Props) => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback( async(acceptedFiles:File[]) => {
    setFiles(acceptedFiles);
    // HERE 2: 55: 00 //next time
  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  const handleRemoveFile = (e: React.MouseEvent<HTMLImageElement>, fileName: string) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name != fileName))
  }

  return (
    <div {...getRootProps()} className='cursor-pointer'>
    <input {...getInputProps()} />
    <Button type='button' className={cn('uploader-button', className)}>
        <Image
        src='/assets/icons/upload.svg'
        alt='upload'
        width={24}
        height={24}
        className=''
        />
        <p>Upload</p>
    </Button>
    {files.length > 0 && <ul className='uploader-preview-list'>
      <h4 className='h4 text-light-100'>Uploading</h4>
      {files.map((file, index) => {
        const {type, extension} = getFileType(file.name);

        return (
          <li key={`${file.name}-${index}`} className='uploader-preview-item'>
            <div className='flex items-center gap-3'>
                <Thumnail
                type={type}
                extension={extension}
                url={convertFileToUrl(file)}
                />
                <div className='preview-item-name'>
                  {file.name}
                  <Image 
                  src='/assets/icons/file-loader.gif'
                  alt='file-loader'
                  width={80}
                  height={26}
                  />
                </div>
            </div>
            <Image
            src='/assets/icons/remove.svg'
            width={24}
            height={24}
            alt='remove'
            onClick={(e)=>{handleRemoveFile(e, file.name)}}
            />
          </li>
        )
      })}
    </ul> }
    {
      isDragActive ?
        <p>Drop the files here ...</p> :
        <p>Drag 'n' drop some files here, or click to select files</p>
    }
  </div>
  )
}

export default FileUploader
