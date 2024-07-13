import logo from '../../images/logo/btLogo.png'
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateUserMutation } from '../../Redux/Features/BaseApi';

type Inputs = {
    fname: string;
    lname: string;
    userName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string
};

export default function RegisterUser() {
    const [postUser, {isLoading, isError, isSuccess, error}] = useCreateUserMutation();
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const handleRegister: SubmitHandler<Inputs> = (data) => {
        console.log(data)
        postUser(data)
        .then((res)=>{
            console.log(res)
        })
    }

    console.log(watch('password'))

    return (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
            {/* <!-- ===== Page Wrapper Start ===== --> */}
            <div className="flex flex-col min-h-screen items-center justify-center">
                {/* <!-- Sign Up Form --> */}
                <div className="w-full md:w-[500px] rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <img src={logo} alt="logo" className='mx-auto h-10 w-32' />
                        <h3 className="font-medium mt-1 text-black dark:text-white text-center text-lg">
                            Sign Up Now
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit(handleRegister)}>
                        <div className="p-6.5">

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        First name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your first name"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        {...register("fname", { required: true })}
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Last name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your last name"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        {...register("lname", { required: true })}
                                    />
                                </div>
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    User Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your user name"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    {...register("userName", { required: true })}
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    {...register("email", { required: true })}
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Phone
                                </label>
                                <input
                                    type="number"
                                    placeholder="Enter your phone number"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    {...register("phone", { required: true })}
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    {...register("password", { required: true })}
                                />
                            </div>

                            <div className="mb-5.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Re-type Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Re-enter password"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    {...register("confirmPassword", { required: true })}
                                />
                            </div>

                            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
