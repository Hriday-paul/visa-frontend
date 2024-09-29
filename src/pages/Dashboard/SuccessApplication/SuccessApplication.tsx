import { useCallback, useEffect, useRef, useState } from "react";
import PrintLayout from "../../PrintApplication/PrintLayout";
import { useReactToPrint } from "react-to-print";
import { useNavigate, useParams } from "react-router-dom";
import { useLazyGetAplicationWithMutateQuery } from "../../../Redux/Features/BaseApi";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";
import { FaPrint, FaRegEye } from "react-icons/fa";
import Confetti from 'react-confetti'

export default function SuccessApplication() {
  const { id } = useParams();
  const [cookies] = useCookies(['baerer-token']);
  const token = cookies["baerer-token"];
  const [getApplication, { isLoading, isSuccess, data, isFetching }] = useLazyGetAplicationWithMutateQuery();
  const [ConfettiSize, setConfettiSize] = useState(300);
  const navig = useNavigate();

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => contentToPrint.current,
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
    pageStyle: "@page { size: auto; margin: 10mm; font-display: swap; }",
  });

  const handleClickBtn = useCallback(() => {
    getApplication({ id, token }).then((res) => {
      if (res?.isError) {
        toast.error("Something went wrong, try again")
      }
      if (res?.isSuccess) {
        setTimeout(() => {
          handlePrint()
        }, 500)

      }
    })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setConfettiSize(prevSize => (prevSize > 0 ? prevSize - 10 : 0));
    }, 100);

    return () => clearTimeout(timer);
  }, [ConfettiSize]);

  const handlePreview = useCallback(()=>{
    navig(`/dashboard/my-applications/`+id)
  }, [])

  return (
    <div className="min-h-[calc(100vh-146px)] flex items-center justify-center">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={ConfettiSize}
        tweenDuration={600}
      />
      <div className="bg-white w-11/12 md:w-3/4 lg:w-4/5 2xl:w-1/2 shadow-xl py-10 md:py-20 px-5 rounded-lg flex flex-col justify-center items-center">
        <img src="/success.png" alt="success icon" className="mx-auto h-28 w-auto md:h-auto md:w-auto" />
        <h4 className="text-center text-2xl md:text-3xl text-black dark:text-gray font-semibold mt-4 md:mt-8">Thank You for Application</h4>
        <p className="text-center text-base md:text-lg text-slate-600 dark:text-slate-400 mt-2">Your application submited successfully</p>
        <div className="space-x-1 md:space-x-3 mt-5 flex flex-row">

          <button onClick={handlePreview} className="px-4 md:px-6 py-2 md:py-3 bg-white border border-primary hover:bg-primary hover:border-primary outline-none duration-200 font-medium hover:text-white rounded">
            <span className="text-sm md:text-base flex items-center gap-x-1.5"> <FaRegEye /> Preview</span>
          </button>

          <button onClick={handleClickBtn} className="px-4 md:px-6 py-2 md:py-3 bg-primary outline-none duration-200 hover:opacity-80 font-medium text-white rounded border border-primary hover:border-primary disabled:bg-blue-400 disabled:cursor-not-allowed flex flex-row justify-center items-center" disabled={isLoading || isFetching}>
            {(isLoading || isFetching) && <ImSpinner2 className="text-xl text-white animate-spin mr-1.5" />}
            <span className="text-sm md:text-base flex items-center gap-x-1.5"> <FaPrint /> Print</span>
          </button>

          {isSuccess && <PrintLayout contentToPrintRef={contentToPrint} data={data} />}

        </div>
      </div>
    </div>
  )
}
