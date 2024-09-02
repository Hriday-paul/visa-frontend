import { useCookies } from "react-cookie";
import AdminError from "../../../components/Shared/AdminError";
import AdminLoading from "../../../components/Shared/AdminLoading";
import { useAllApplicationQuery } from "../../../Redux/Features/BaseApi"
import { ApplicationResponseType } from "../../../Redux/Features/Types";
import { DataTable, DataTableSortStatus } from "mantine-datatable"; // Import the correct type from mantine-datatable
import { useMemo, useState } from "react";
import { ActionIcon, MultiSelect, TextInput } from '@mantine/core';
import { RxCross2 } from "react-icons/rx";
import { DeleteApplication } from "../ApplicationDetails/DeleteApplication";
import { Link } from "react-router-dom";
import moment from "moment";
import { DatePicker, type DatesRangeValue } from '@mantine/dates';
import '@mantine/dates/styles.css';
import { useDebouncedValue } from '@mantine/hooks';

export default function AllAppplicatons() {
    const [cookies] = useCookies(['baerer-token']);
    const token = cookies["baerer-token"];
    const [page, setPage] = useState<number>(1)
    const limit = 5;

    const [query, setQuery] = useState<{ full_name: string, email: string, phone_number: string }>({ full_name: '', email: '', phone_number: '' });
    const [debouncedFullName] = useDebouncedValue(query.full_name, 500);
    const [debouncedEmail] = useDebouncedValue(query.email, 500);
    const [debouncedPhoneNumber] = useDebouncedValue(query.phone_number, 500);

    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
    const [birthdaySearchRange, setBirthdaySearchRange] = useState<DatesRangeValue>();

    const { isError, isLoading, isSuccess, data: applications } = useAllApplicationQuery({
        token,
        currentPage: page,
        limit,
        full_name: debouncedFullName,
        email: debouncedEmail,
        phone_number: debouncedPhoneNumber,
        visaTypes: selectedDepartments,
        submission_date : birthdaySearchRange
    });

    const [selectedRecords, setSelectedRecords] = useState<ApplicationResponseType[]>([]);

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus<ApplicationResponseType>>({
        columnAccessor: 'full_name',
        direction: 'asc',
    });
    
    const handleSortStatusChange = (newSortStatus: DataTableSortStatus<ApplicationResponseType>) => {
        setSortStatus(newSortStatus);
    };

    const sortedApplications = useMemo(() => {
        if (!applications) return [];

        const sortedData = [...applications.results];
        sortedData.sort((a, b) => {
            const columnAccessor = sortStatus.columnAccessor as keyof ApplicationResponseType;

            const aValue = a[columnAccessor];
            const bValue = b[columnAccessor];

            if (columnAccessor === 'date_of_birth') {
                const aDate = new Date(aValue as string);
                const bDate = new Date(bValue as string);
                return sortStatus.direction === 'asc'
                    ? aDate.getTime() - bDate.getTime()
                    : bDate.getTime() - aDate.getTime();
            }

            if (aValue < bValue) {
                return sortStatus.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortStatus.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

        return sortedData;
    }, [applications, sortStatus]);

    return (
        <div>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark my-0">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        All Applications
                    </h3>
                </div>
                <div className="px-6.5">
                    {
                        isLoading ? <AdminLoading /> : isError ? <AdminError /> : !isSuccess ? <></> :
                            <div className="py-6">
                                <DataTable
                                    columns={[
                                        {
                                            accessor: 'full_name',
                                            sortable: true,
                                            filter: (
                                                <TextInput
                                                    label="Name"
                                                    description="Show applications whose names include the specified text"
                                                    placeholder="Search by name..."

                                                    rightSection={
                                                        <ActionIcon size="sm" variant="transparent" c="dimmed" onClick={() => {
                                                            setQuery({ ...query, full_name: '' })
                                                        }}>
                                                            <RxCross2 size={14} />
                                                        </ActionIcon>
                                                    }
                                                    value={query?.full_name}
                                                    onChange={(e) => {setQuery({ ...query, full_name: e.currentTarget.value })}}
                                                />
                                            ),
                                            filtering: query?.full_name !== '',
                                            resizable: true
                                        },
                                        {
                                            accessor: 'email', resizable: true,
                                            filter: (
                                                <TextInput
                                                    label="Email"
                                                    description="Show applications whose email include the specified text"
                                                    placeholder="Search by email..."

                                                    rightSection={
                                                        <ActionIcon size="sm" variant="transparent" c="dimmed" onClick={() => setQuery({ ...query, email: '' })}>
                                                            <RxCross2 size={14} />
                                                        </ActionIcon>
                                                    }
                                                    value={query?.email}
                                                    onChange={(e) => setQuery({ ...query, email: e.currentTarget.value })}
                                                />
                                            ),
                                            filtering: query?.email !== '',
                                        },
                                        {
                                            accessor: 'phone_number', resizable: true,
                                            filter: (
                                                <TextInput
                                                    label="Phone number"
                                                    description="Show applications whose phone number include the specified text"
                                                    placeholder="Search by phone..."

                                                    rightSection={
                                                        <ActionIcon size="sm" variant="transparent" c="dimmed" onClick={() => setQuery({ ...query, phone_number: '' })}>
                                                            <RxCross2 size={14} />
                                                        </ActionIcon>
                                                    }
                                                    value={query?.phone_number}
                                                    onChange={(e) => setQuery({ ...query, phone_number: e.currentTarget.value })}
                                                />
                                            ),
                                            filtering: query?.phone_number !== '',
                                        },
                                        {
                                            accessor: 'submission_date', sortable: true, resizable: true, render: (record) => {
                                                return moment(record?.submission_date).format('L');
                                            },
                                            filter: ({ }) => (

                                                <DatePicker
                                                    maxDate={new Date()}
                                                    type="range"
                                                    value={birthdaySearchRange}
                                                    onChange={setBirthdaySearchRange}
                                                />
                                            )
                                        },
                                        {
                                            accessor: 'visa_type', resizable: true,
                                            filter: (
                                                <MultiSelect
                                                    label="Visa types"
                                                    
                                                    data={['Student', 'Work', 'Family', "Tourist", "Business", 'Medical']}
                                                    value={selectedDepartments}
                                                    placeholder="Search departments…"
                                                    onChange={setSelectedDepartments}

                                                    clearable
                                                    searchable
                                                />
                                            ),
                                            filtering: selectedDepartments.length > 0,
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
                                                    <Link to={`/admin/applications/${application?.encoded_id}`} className=" bg-primary text-white p-3 hover:opacity-80">
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
                                                    <DeleteApplication id={application?.id} />
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
                                    records={sortedApplications}
                                    withTableBorder
                                    borderRadius="sm"
                                    withColumnBorders
                                    striped
                                    verticalSpacing="md"
                                    fz="md"
                                    minHeight={150}
                                    verticalAlign="center"
                                    sortStatus={sortStatus}
                                    onSortStatusChange={handleSortStatusChange}
                                    pinLastColumn={true}

                                    selectedRecords={selectedRecords}
                                    onSelectedRecordsChange={setSelectedRecords}

                                    totalRecords={applications?.count}
                                    recordsPerPage={5}
                                    page={page}
                                    onPageChange={(p) => setPage(p)}
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

