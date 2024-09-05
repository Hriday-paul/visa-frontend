import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../Redux/Store";
import { useCookies } from "react-cookie";
import logo from '../../../images/logo/btLogo.png'
import { MdErrorOutline, MdOutlineDoneAll } from "react-icons/md";
import { useAdmnLoginMutation } from "../../../Redux/Features/BaseApi";
import { updateAdminVerified } from "../../../Redux/Slices/UserSlice";

type Inputs = { email: string; password: string };
type message = { type: 'success' | 'error', message: string };

export default function Login() {
    const [postLoginAdmin, { isLoading, isError, isSuccess, error, data }] = useAdmnLoginMutation();
    const [message, setMessage] = useState<message | null>(null);
    const navig = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [_, setCookie] = useCookies(['baerer-token']);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>();

    const handleLogin: SubmitHandler<Inputs> = (data) => {
        setMessage(null);
        postLoginAdmin(data)
    };

    useEffect(() => {
        if (isSuccess) {
            setCookie('baerer-token', data?.token?.access, {
                httpOnly: false,
                maxAge: 14 * 24 * 60 * 60, // 7 days
                path: '/',
                sameSite: 'lax',
                secure: import.meta.env.VITE_NODE_ENV === 'production',
            });
            dispatch(updateAdminVerified({ isVerified: true, email: data?.email, fullName: data?.first_name + ' ' + data?.last_name, phone: data?.phone_no, userName: data?.username, id : data?.user_id }));
            setMessage({ type: 'success', message: data?.message });
            reset();
            navig('/admin');
        }
        if (isError) {
            const errType = error as  { error: string }
            setMessage({ type: 'error', message: errType?.error || 'something went wrong, try again' })
        }
    }, [isSuccess, isError, reset]);

    return (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
            {/* <!-- ===== Page Wrapper Start ===== --> */}
            <div className="flex flex-col min-h-screen items-center justify-center">
                {/* <!-- Sign Up Form --> */}
                <div className="w-full md:w-[500px] rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <img src={logo} alt="logo" className='mx-auto h-10 w-32' />
                        <h3 className="font-medium mt-1 text-black dark:text-white text-center text-lg">
                            Login as a Admin
                        </h3>
                    </div>


                    <form onSubmit={handleSubmit(handleLogin)}>
                        <div className="p-6.5">

                            {message && <div className='py-2'>
                                <div className={`${message?.type === 'error' ? 'bg-red-100 border border-orange-200 p-2 w-full rounded-md flex items-center mb-3' : 'bg-green-100 border border-green-200 p-2 w-full rounded-md flex items-center mb-3'}`}>
                                    {message?.type == 'error' && <MdErrorOutline className='text-2xl text-orange-500' />}
                                    {message?.type == 'success' && <MdOutlineDoneAll className='text-2xl text-green-500' />}
                                    <p className='text-black dark:text-white text-base ml-2'>{message?.message}</p>
                                </div>
                            </div>}

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className={`w-full rounded border-[1.5px]  bg-transparent py-3 px-5 text-black outline-none transition ${errors.email ? "border-red-500" : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'} disabled:cursor-default disabled:bg-whiter  dark:bg-form-input dark:text-white`}
                                    {...register("email", { required: true })}
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    className={`w-full rounded border-[1.5px]  bg-transparent py-3 px-5 text-black outline-none transition ${errors.password ? "border-red-500" : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'} disabled:cursor-default disabled:bg-whiter  dark:bg-form-input dark:text-white `}
                                    {...register("password", { required: true })}
                                />
                            </div>

                            <button disabled={isLoading} className="flex w-full justify-center items-center rounded bg-primary disabled:bg-blue-300 disabled:cursor-not-allowed p-3 font-medium text-gray hover:bg-opacity-90">
                                {isLoading && <ImSpinner2 className="text-xl text-white animate-spin mr-1.5" />}
                                <p>Sign In</p>
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
