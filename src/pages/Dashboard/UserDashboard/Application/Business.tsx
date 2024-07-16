import BreadCrumb from "../../../../components/Shared/BreadCrump";

const routList = [{name : ' / application', rout : '/dashboard/application'}, {name : ' / business', rout : '/dashboard/application/business'}]
export default function Business() {
  return (
    <div>
        <BreadCrumb pageName="Application Form" routList={routList} />
    </div>
  )
}
