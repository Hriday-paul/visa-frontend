import React from 'react'
import toast from 'react-hot-toast';
import { MdOutlineEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../Redux/Store';
import { editDocument } from '../../../../Redux/Slices/EditApplicationSlice';

const ChangeDocumentCard = React.memo(({ name, }: { name: string }) => {
    const dispatch = useDispatch<AppDispatch>();
    const draft = useSelector((state: RootState) => state.editApplication);
    const toBase64 = (file: File) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        })
    }

    const addFile = async (e: React.ChangeEvent<HTMLInputElement>, key: 'user_photo' | 'passport_front_photo' | 'passport_back_photo' | 'health_ensurence' | 'travel_insurance' | 'applicant_signature') => {
        const fileList = e.target.files as File[] | null;
        if (!fileList) {
            return;
        }
        try {
            const result = await toBase64(fileList[0]);
            dispatch(editDocument({ key, value: result as string }));
        } catch (error) {
            toast.error('File upload failed, try again.')
            return;
        }
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files as File[] | null;
        if (name == 'My photo' && fileList) {
            addFile(e, 'user_photo')
        }
        if (name == 'Passport Front' && fileList) {
            addFile(e, 'passport_front_photo')
        }
        if (name == 'Passport Back' && fileList) {
            addFile(e, 'passport_back_photo')
        }
        if (name == 'Health ensurence' && fileList) {
            addFile(e, 'health_ensurence')
        }
        if (name == 'Travel insurance' && fileList) {
            addFile(e, 'travel_insurance')
        }
        if (name == 'Signature' && fileList) {
            addFile(e, 'applicant_signature')
        }
    }



    return (
        <div>
            <label htmlFor={name} className="relative group cursor-pointer">
                <img className="max-w-xs w-32 h-32 object-cover items-center border" src={(name == 'My photo') ? draft?.user_photo : (name == 'Passport Front') ? draft?.passport_front_photo : (name == 'Passport Back')? draft?.passport_back_photo : (name == 'Health ensurence') ? draft?.health_ensurence : (name == 'Travel insurance') ? draft?.travel_insurance : draft?.applicant_signature} alt="profile photo" />
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
