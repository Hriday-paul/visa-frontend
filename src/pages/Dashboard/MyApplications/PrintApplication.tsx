import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import { ApplicationResponseType } from '../../../Redux/Features/Types';
import { LuPrinter } from 'react-icons/lu';
import PrintLayout from '../../PrintApplication/PrintLayout';

const PrintApplication = React.memo(({ application }: { application: ApplicationResponseType })=> {
    const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => contentToPrint.current,
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
        pageStyle: "@page { size: auto; margin: 10mm; font-display: swap; }",
    });

    return (
        <div>
            <button onClick={handlePrint} className=" bg-primary text-white p-3 hover:opacity-80">
                <LuPrinter className='text-lg text-white' />
            </button>
            <PrintLayout contentToPrintRef={contentToPrint} data={application} />
        </div>
    )
})

export default PrintApplication;
