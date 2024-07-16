import BreadCrumb from "../../../../components/Shared/BreadCrump"

const routList = [{name : ' / application', rout : '/dashboard/application'}, {name : ' / tourist', rout : '/dashboard/application/tourist'}]
export default function Tourist() {
  return (
    <div>
        <BreadCrumb pageName="Application Form" routList={routList} />
    </div>
  )
}
