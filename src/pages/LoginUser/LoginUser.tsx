import { useEffect, useState } from "react";
import { useLoginUserMutation } from "../../Redux/Features/BaseApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import logo from '../../images/logo/btLogo.png'
import { Link, useNavigate } from "react-router-dom";
import { MdErrorOutline, MdOutlineDoneAll } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/Store";
import { updateUserVerified } from "../../Redux/Slices/UserSlice";
import { useCookies } from "react-cookie";

type Inputs = { email: string; password: string };
type message = { type: 'success' | 'error', message: string };

export default function LoginUser() {
    const [postLoginUser, { isLoading, isError, isSuccess, error, data }] = useLoginUserMutation();
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
        postLoginUser(data)
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
            dispatch(updateUserVerified({ isVerified: true, email: data?.email, fullName: data?.first_name + ' ' + data?.last_name, phone: data?.phone_no, userName: data?.username, id : data?.user_id }));
            setMessage({ type: 'success', message: data?.message });
            reset();
            navig('/dashboard/application');
        }
        if (isError) {
            console.log(error)
            const errType = error as { data: { error: string } }
            setMessage({ type: 'error', message: errType?.data?.error || 'something went wrong, try again' })
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
                            Sign In Now
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

                            {/* <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className={`w-full rounded border-[1.5px]  bg-transparent py-3 px-5 text-black outline-none transition ${errors.email ? "border-red-500" : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'} disabled:cursor-default disabled:bg-whiter  dark:bg-form-input dark:text-white`}
                                    {...register("email", { pattern: /(?=.*?[@])/, required: true })}
                                />
                            </div> */}

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


                            {/* <div className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-2.5 mt-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50 cursor-pointer">
                                <span>
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g clipPath="url(#clip0_191_13499)">
                                            <path
                                                d="M19.999 10.2217C20.0111 9.53428 19.9387 8.84788 19.7834 8.17737H10.2031V11.8884H15.8266C15.7201 12.5391 15.4804 13.162 15.1219 13.7195C14.7634 14.2771 14.2935 14.7578 13.7405 15.1328L13.7209 15.2571L16.7502 17.5568L16.96 17.5774C18.8873 15.8329 19.9986 13.2661 19.9986 10.2217"
                                                fill="#4285F4"
                                            />
                                            <path
                                                d="M10.2055 19.9999C12.9605 19.9999 15.2734 19.111 16.9629 17.5777L13.7429 15.1331C12.8813 15.7221 11.7248 16.1333 10.2055 16.1333C8.91513 16.1259 7.65991 15.7205 6.61791 14.9745C5.57592 14.2286 4.80007 13.1801 4.40044 11.9777L4.28085 11.9877L1.13101 14.3765L1.08984 14.4887C1.93817 16.1456 3.24007 17.5386 4.84997 18.5118C6.45987 19.4851 8.31429 20.0004 10.2059 19.9999"
                                                fill="#34A853"
                                            />
                                            <path
                                                d="M4.39899 11.9777C4.1758 11.3411 4.06063 10.673 4.05807 9.99996C4.06218 9.32799 4.1731 8.66075 4.38684 8.02225L4.38115 7.88968L1.19269 5.4624L1.0884 5.51101C0.372763 6.90343 0 8.4408 0 9.99987C0 11.5589 0.372763 13.0963 1.0884 14.4887L4.39899 11.9777Z"
                                                fill="#FBBC05"
                                            />
                                            <path
                                                d="M10.2059 3.86663C11.668 3.84438 13.0822 4.37803 14.1515 5.35558L17.0313 2.59996C15.1843 0.901848 12.7383 -0.0298855 10.2059 -3.6784e-05C8.31431 -0.000477834 6.4599 0.514732 4.85001 1.48798C3.24011 2.46124 1.9382 3.85416 1.08984 5.51101L4.38946 8.02225C4.79303 6.82005 5.57145 5.77231 6.61498 5.02675C7.65851 4.28118 8.9145 3.87541 10.2059 3.86663Z"
                                                fill="#EB4335"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_191_13499">
                                                <rect width="20" height="20" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </span>
                                Sign in with Google
                            </div> */}

                            <div className="mt-6 text-center">
                                <p>
                                    Don’t have any account?{' '}
                                    <Link to="/register" className="text-primary">
                                        Sign Up
                                    </Link>
                                </p>
                            </div>


                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
