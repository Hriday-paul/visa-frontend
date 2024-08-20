import React, { useRef, useState } from 'react'
import { LuCopy, LuCopyCheck } from 'react-icons/lu';

const CopyTrackId = React.memo(({ id }: { id: string }) => {
    const [isCopy, setIsCopy] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null)

    const copyText = () => {
        const target = textRef.current as HTMLParagraphElement;
        navigator.clipboard.writeText(target.innerText).then(function () {
            setIsCopy(prev => !prev)
        });
    }

    return (
        <div className="flex flex-row items-center justify-between mb-3.5">
            <span className="w-1/2">Tracking id</span>
            <span className="w-1/2 flex items-center gap-x-1">
                <p ref={textRef} className="inline-flex rounded-full bg-opacity-10 py-1 px-1 text-xs lg:text-sm font-medium w-full truncate">
                    {id}
                </p>
                {id ? !isCopy ?
                    <span onClick={copyText}>
                        <LuCopy className='text-base cursor-pointer' />
                    </span>
                    : <LuCopyCheck className='text-base text-green-500' /> : <></>}
            </span>
        </div>
    )
})

export default CopyTrackId;