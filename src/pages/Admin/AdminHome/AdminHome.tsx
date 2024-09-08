import { useCookies } from "react-cookie";
import CardDataStats from "./Template/CardDataStats";
import { MdDoneAll, MdListAlt, MdMovieEdit, MdOutlineRemoveDone } from "react-icons/md";
import BarChart from "./Template/BarChart";
import Paichart from "./Template/Paichart";
import AdminLoading from "../../../components/Shared/AdminLoading";
import AdminError from "../../../components/Shared/AdminError";
import { useAdminDashboardChartQuery, useAdminDashboardCountQuery, useAdminDashboardVisaPaiChartQuery } from "../../../Redux/Features/BaseApi";


export default function AdminHome() {
    const [cookies] = useCookies(['baerer-token']);
    const token = cookies["baerer-token"];
    const { isLoading: countLoading, isError: countIsErr, isSuccess: countSuccess, data: countData } = useAdminDashboardCountQuery({ token }, {refetchOnMountOrArgChange : true});
    const { isLoading: chartLoading, isError: chartIsErr, isSuccess: chartSuccess, data: chartData } = useAdminDashboardChartQuery({ token }, {refetchOnMountOrArgChange : true})
    const { isLoading: paiChartLoading, isError: paiChartIsErr, isSuccess: paiChartSuccess, data: paiChartData } = useAdminDashboardVisaPaiChartQuery({ token }, {refetchOnMountOrArgChange : true})

    return (
        <div>
            {
                (countLoading || chartLoading || paiChartLoading) ? <AdminLoading /> : (countIsErr || chartIsErr || paiChartIsErr) ? <AdminError /> : !countSuccess ? <></> :
                    <div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                            <CardDataStats title="Total Application" total={countData?.total_application} >
                                <MdListAlt className="h-5 w-5 fill-primary dark:fill-white" />
                            </CardDataStats>
                            <CardDataStats title="Total Approve" total={countData?.total_approve}>
                                <MdDoneAll className="h-5 w-5 fill-primary dark:fill-white" />
                            </CardDataStats>
                            <CardDataStats title="Total Reject" total={countData?.total_reject}>
                                <MdOutlineRemoveDone className="h-5 w-5 fill-primary dark:fill-white" />
                            </CardDataStats>
                            <CardDataStats title="Modified Access" total={countData?.under_modified}>
                                <MdMovieEdit className="h-5 w-5 fill-primary dark:fill-white" />
                            </CardDataStats>
                        </div>
                        <div className="mt-4 grid grid-cols-1 xl:grid-cols-2 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                            {
                                chartSuccess && <div>
                                    <BarChart data={chartData} />
                                </div>
                            }
                            {
                                paiChartSuccess && <div>
                                    <Paichart data={paiChartData} />
                                </div>
                            }
                        </div>
                    </div>
            }
        </div>
    )
}
