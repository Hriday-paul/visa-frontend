import { Empty } from "antd";
import { MdOutlineLocalPolice, MdPendingActions } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import { TbDeviceIpadMinus } from "react-icons/tb";

export default function VisaStatus() {
    return (
        <div className="max-w-270 w-full">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark my-8">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Visa Status
                    </h3>
                </div>

                <div className="p-6 5">
                    <div className="w-full xl:w-1/2 mx-auto flex">
                        {/* <h3 className="text-center text-lg font-medium mb-2"></h3> */}
                        <input
                            type="text"
                            placeholder="Enter your Tracking Id"
                            required
                            className="w-full rounded-md rounded-r-none border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white "
                        />
                        <button className="bg-primary px-8 py-2 text-white">Track</button>
                    </div>


                    <div className="bg-white dark:bg-boxdark min-h-80 flex justify-center items-center">
                        {/* <Empty /> */}


                        <div className="mb-8 text-center w-full relative px-12 flex flex-col my-10">

                            <ul className="mx-1 before:top-18 before:absolute before:border-t before:border-dashed before:h-0 before:left-20 lg:before:left-16 xl:before:left-28 md:before:block before:w-4/5 flex flex-col gap-y-8 md:gap-y-0 md:flex-row justify-between items-center mt-5 before:hidden">
                                <li className="z-10 ">
                                    <span className="h-24 w-24 bg-white dark:bg-form-input  border-2 border-primary hover:bg-primary dark:hover:bg-primary hover:border-transparent group rounded-full flex justify-center items-center">
                                        <MdPendingActions className="text-4xl text-primary group-hover:text-white dark:text-slate-100" />
                                    </span>
                                    <div>
                                        <p className="mt-2 text-center dark:text-slate-300">Step 1 </p>
                                        <h3 className="text-xl font-medium text-black -mt-1 text-center dark:text-slate-100">Pending</h3>
                                    </div>
                                </li>
                                <li className="z-10 ">
                                    <div className="mx-auto flex justify-center items-center">
                                        <div className="h-24 w-24 bg-white border-2 border-primary hover:bg-primary hover:border-white group rounded-full flex justify-center items-center">
                                            <TbDeviceIpadMinus className="text-4xl text-primary group-hover:text-white" />
                                        </div>
                                    </div>
                                    <p className="mt-2 text-center">Step 2 </p>
                                    <h3 className="text-xl font-medium text-black -mt-1 text-center">Admin approve</h3>
                                </li>
                                <li className="z-10">
                                    <div className="mx-auto flex justify-center items-center">
                                        <div className="h-24 w-24 bg-white border-2 border-primary hover:bg-primary hover:border-white group rounded-full flex justify-center items-center">
                                            <MdOutlineLocalPolice className="text-4xl text-primary group-hover:text-white" />
                                        </div>
                                    </div>
                                    <p className="mt-2 text-center">Step 3 </p>
                                    <h3 className="text-xl font-medium text-black -mt-1 text-center">Police verification</h3>
                                </li>
                                <li className="z-10 ">
                                    <div className="h-24 w-24 bg-white border-2 border-primary hover:bg-primary hover:border-white group rounded-full flex justify-center items-center">
                                        <SiTicktick className="text-4xl text-primary group-hover:text-white" />
                                    </div>
                                    <p className="mt-2 text-center">Step 4 </p>
                                    <h3 className="text-xl font-medium text-black -mt-1 text-center">Approved</h3>
                                </li>
                            </ul>


                        </div>

                    </div>
                    <div className="px-12 py-8 border-t border-slate-200">
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet qui quasi modi fugiat aut ipsa mollitia nulla quaerat culpa omnis?</p>
                    </div>

                </div>


            </div>
        </div>
    )
}
