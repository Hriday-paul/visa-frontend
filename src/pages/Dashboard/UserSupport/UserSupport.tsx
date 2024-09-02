import { SubmitHandler, useForm } from "react-hook-form";
import { useSendSupportMessageMutation } from "../../../Redux/Features/BaseApi";
import { ImSpinner } from "react-icons/im";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import toast from "react-hot-toast";

export type userSupportType = {
  subject: string,
  massage: string
}

export default function UserSupport() {
  const [postMessage, { isLoading, isError, isSuccess, data }] = useSendSupportMessageMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userSupportType>();

  const [cookies] = useCookies(['baerer-token']);

  const handlePostMessage: SubmitHandler<userSupportType> = (data) => {
    const token = cookies["baerer-token"]
    postMessage({ formData: data, token })
  }

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      toast.success('Your message send successfully');
    }
    if (isError) {
      toast.error('Message send failed')
    }
  }, [isSuccess, isError]);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Support
        </h3>
      </div>
      <form onSubmit={handleSubmit(handlePostMessage)}>
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Subject
              </label>
              <input
                type="text"
                {...register("subject", { required: true })}
                placeholder="subject"
                className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white ${errors?.subject ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`}
              />
            </div>
          </div>
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Message
              </label>
              <textarea
                rows={5}
                {...register("massage", { required: true })}
                placeholder="write your message"
                className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white ${errors?.massage ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`}
              />
            </div>
          </div>

          <button
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2.5 bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 disabled:bg-opacity-80 disabled:cursor-not-allowed"
          >
            {isLoading && <ImSpinner className="text-lg text-white animate-spin " />}
            Send
          </button>

        </div>
      </form>
    </div>
  )
}

