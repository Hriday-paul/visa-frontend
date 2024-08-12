import { MdErrorOutline } from "react-icons/md";

export default function StatusError({ error }: { error: any }) {
    return (
        <div>
            <div className="flex justify-center items-center min-h-80">
                <div className="space-y-2">
                    <MdErrorOutline className="text-3xl md:text-4xl lg:text-5xl text-black dark:text-slate-100 text-center mx-auto" />
                    <h1 className="text-base md:text-lg lg:text-xl text-black dark:text-slate-100 text-center ">Something Wrong</h1>
                    <p className="text-xs md:text-sm lg:text-base text-center text-gray-900 dark:text-slate-300">{error?.data && error?.data[0]}</p>
                </div>
            </div>
        </div>
    )
}
