import { useCookies } from "react-cookie";
import { useMyallApplicationsQuery } from "../../../Redux/Features/BaseApi"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../Redux/Store";
import { Link } from "react-router-dom";
import AdminLoading from "../../../components/Shared/AdminLoading";
import AdminError from "../../../components/Shared/AdminError";
import { DataTable } from "mantine-datatable";
import moment from "moment";
import { addAllInfo } from "../../../Redux/Slices/EditApplicationSlice";


export default function MyApplications() {
    const [cookies] = useCookies(['baerer-token']);
    const token = cookies["baerer-token"];
    const user = useSelector((state: RootState) => state?.user);
    const { isLoading, isError, isSuccess, data: applications } = useMyallApplicationsQuery({ token, userId: user?.id })
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark my-8">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        My All Aplication's
                    </h3>
                </div>
                <div className="px-6.5 mt-5">
                    {
                        isLoading ? <AdminLoading /> : isError ? <AdminError /> : !isSuccess ? <></> :
                            <div className="py-6">
                                <DataTable
                                    columns={[
                                        {
                                            accessor: 'full_name',
                                            resizable: true
                                        },
                                        {
                                            accessor: 'email', resizable: true,
                                        },
                                        {
                                            accessor: 'phone_number', resizable: true,
                                            
                                        },
                                        {
                                            accessor: 'submission_date', sortable: true, resizable: true, render: (record) => {
                                                return moment(record?.submission_date).format('L');
                                            },
                                        },
                                        {
                                            accessor: 'visa_type', resizable: true,
                                        },
                                        {
                                            accessor: 'is_approved', render: (record) => record?.is_approved ? <p className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium bg-success text-success">Approved</p> : <p className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium bg-danger text-danger">Not Approved</p>,
                                            title: 'Approved',
                                            resizable: true,
                                        },
                                        {
                                            accessor: 'actions',
                                            title: 'Actions',
                                            render: (application) => (
                                                <div className="flex items-center space-x-3.5">
                                                    <Link onClick={()=>dispatch(addAllInfo(application))} to={`/dashboard/my-applications/${application?.encoded_id}`} className=" bg-primary text-white p-3 hover:opacity-80">
                                                        <svg
                                                            className="fill-current"
                                                            width="18"
                                                            height="18"
                                                            viewBox="0 0 18 18"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                                                                fill=""
                                                            />
                                                            <path
                                                                d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                                                                fill=""
                                                            />
                                                        </svg>
                                                    </Link>
                                                    {/* <DeleteApplication id={application?.id} /> */}
                                                </div>
                                            ),
                                            resizable: true
                                        },
                                    ]}
                                    classNames={{
                                        table: "border border-stroke dark:border-graydark",
                                        header: "border-b border-stroke dark:border-graydark",
                                        footer: "border-t border-stroke dark:border-graydark",
                                        pagination: "border border-t-0 border-stroke dark:border-graydark",
                                    }}
                                    fetching={isLoading}
                                    records={applications}
                                    withTableBorder
                                    borderRadius="sm"
                                    withColumnBorders
                                    striped
                                    verticalSpacing="md"
                                    fz="md"
                                    minHeight={150}
                                    verticalAlign="center"
                                    
                                    pinLastColumn={true}

                                    totalRecords={20}
                                    recordsPerPage={5}
                                    page={1}
                                    onPageChange={(p) => console.log(p)}
                                    paginationSize="md"
                                    paginationActiveBackgroundColor="blue"
                                />
                            </div>
                    }

                </div>
            </div>
        </div>
    )
}
