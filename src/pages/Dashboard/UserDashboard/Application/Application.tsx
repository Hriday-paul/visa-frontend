import { Steps } from "antd"
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux";
import { RootState } from "../../../../Redux/Store";

export default function Application() {
    const { stepList, step } = useSelector((state: RootState) => state.applicationStep);

    return (
        <div className="flex flex-row gap-x-10 justify-between">

            <div className="max-w-270 w-full">
                <Steps
                    direction="horizontal"
                    current={step}
                    size="small"
                    items={stepList}
                />

                <Outlet />

            </div>

            <div className="w-[calc(100vw-1080px)] mt-6">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark my-8">

                </div>
            </div>
        </div >
    )
}
