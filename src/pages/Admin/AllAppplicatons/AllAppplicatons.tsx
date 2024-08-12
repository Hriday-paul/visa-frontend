import { useCookies } from "react-cookie";
import AdminError from "../../../components/Shared/AdminError";
import AdminLoading from "../../../components/Shared/AdminLoading";
import { useAllApplicationQuery } from "../../../Redux/Features/BaseApi"


export default function AllAppplicatons() {
    const [cookies] = useCookies(['baerer-token']);
    const token = cookies["baerer-token"];
    const {isError, isLoading, isSuccess, data} = useAllApplicationQuery({token});

    return (
        <div>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark my-8">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        All Aplication's
                    </h3>
                </div>
                <div className="p-6.5">
                    {
                        isLoading ? <AdminLoading /> : isError ? <AdminError /> : !isSuccess ? <></> : <div></div>
                    }
                </div>
            </div>
        </div>
    )
}
