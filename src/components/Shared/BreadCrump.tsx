import { Link } from 'react-router-dom';
interface BreadcrumbProps {
    pageName: string;
    routList: { name: string, rout: string }[]
}
const BreadCrumb = ({ pageName, routList }: BreadcrumbProps) => {
    return (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                {pageName}
            </h2>

            <nav>
                <ol className="flex items-center gap-2">
                    <li>
                        <Link className="font-medium" to="/dashboard">
                            Dashboard
                        </Link>
                    </li>
                    {
                        routList.map((routItem, indx) => {
                            return <li key={indx + routItem?.name} className={`font-medium`}>
                                {
                                    indx != (routList.length - 1) ?
                                        <Link className="font-medium" to={routItem.rout}>
                                            {routItem.name}
                                        </Link>
                                        :
                                        <span className='text-primary'>{routItem.name}</span>
                                }
                            </li>
                        })
                    }
                </ol>
            </nav>
        </div>
    );
};

export default BreadCrumb;
