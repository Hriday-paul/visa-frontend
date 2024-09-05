import React from 'react'
import { MdOutlineEdit } from 'react-icons/md';

type setFileType = { user_photo: File | null, passport_front_photo: File | null, passport_back_photo: File | null, health_ensurence: File | null, travel_insurance: File | null, applicant_signature: File | null }

const ChangeDocumentCard = React.memo(({ image, name, setFiles,  }: { image: string | File, name: string, setFiles: React.Dispatch<React.SetStateAction<setFileType>>}) => {
    
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files as File[] | null;
        if (name == 'My photo' && fileList) {
            setFiles(prev => {
                return { ...prev, user_photo: fileList[0] }
            })
        }
        if (name == 'Passport Front' && fileList) {
            setFiles(prev => {
                return { ...prev, passport_front_photo: fileList[0] }
            })
        }
        if (name == 'Passport Back' && fileList) {
            setFiles(prev => {
                return { ...prev, passport_back_photo: fileList[0] }
            })
        }
        if (name == 'Health ensurence' && fileList) {
            setFiles(prev => {
                return { ...prev, health_ensurence: fileList[0] }
            })
        }
        if (name == 'Travel insurance' && fileList) {
            setFiles(prev => {
                return { ...prev, travel_insurance: fileList[0] }
            })
        }
        if (name == 'Signature' && fileList) {
            setFiles(prev => {
                return { ...prev, applicant_signature: fileList[0] }
            })
        }
    }

    return (
        <div>
            <label htmlFor={name} className="relative group cursor-pointer">
                <img className="max-w-xs w-32 h-32 object-cover items-center border" src={image instanceof File ? URL.createObjectURL(image) : image} alt="profile photo" />
                <div className="bg-blue-100 size-6 p-[3px] flex justify-center items-center absolute top-0 right-0 group-hover:w-full group-hover:h-full group-hover:top-0 group-hover:right-0 group-hover:bg-blue-100/60 duration-500 transition-all">
                    <MdOutlineEdit className=" text-blue-500 group-hover:block text-xl cursor-pointer"></MdOutlineEdit>
                </div>
            </label>
            <input type="file" accept="image/*" name={name} id={name} className='hidden' onChange={handleOnChange} />
            <p className='text-center text-black dark:text-gray mt-1'>{name}</p>
        </div>
    )
})

export default ChangeDocumentCard;
