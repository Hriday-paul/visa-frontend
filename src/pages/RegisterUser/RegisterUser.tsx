import logo from '../../images/logo/btLogo.png'
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateUserMutation } from '../../Redux/Features/BaseApi';
import { ImSpinner } from 'react-icons/im';
import { useMemo, useState } from 'react';
import { MdErrorOutline, MdOutlineDoneAll } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '../../Redux/Store';
// import { addUserDetails } from '../../Redux/Slices/UserSlice';

type Inputs = { email: string; first_name: string; last_name: string; username: string, phone_no: string, password: string, confirm_password: string };
type message = { type: 'success' | 'error', message: string }

export default function RegisterUser() {
    const navig = useNavigate();
    const [postUser, { isLoading, isError, isSuccess, error, data }] = useCreateUserMutation();
    const [message, setMessage] = useState<message | null>(null);
    // const dispatch = useDispatch<AppDispatch>();
    const {
        register,
        watch,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>();

    const handleRegister: SubmitHandler<Inputs> = (data) => {
        setMessage(null)
        if (watch('password') !== watch('confirm_password')) {
            return;
        }
        localStorage.setItem('user_email', data?.email);
        // dispatch(addUserDetails({fullName : data?.first_name + ' ' + data?.last_name, userName : data?.username, email : data?.email, phone : data?.phone_no}))
        postUser(data);
    }

    useMemo(() => {
        if (isSuccess) {
            // toast.success("User registration successfully");
            console.log(data)
            setMessage({ type: 'success', message: 'Registration successfully, ' + data });
            reset();
            navig('/verify')
        }
        if (isError) {
            const errType = error as { data: { error: string } }
            console.log(error)
            setMessage({ type: 'error', message: errType?.data?.error || 'something went wrong, try again' })
            // toast.error(errType?.data?.error);
        }
    }, [isSuccess, isError, reset]);

    return (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
            {/* <!-- ===== Page Wrapper Start ===== --> */}
            <div className="flex flex-col min-h-screen items-center justify-center">
                {/* <!-- Sign Up Form --> */}
                <div className="w-full md:w-[500px] rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark my-10">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <img src={logo} alt="logo" className='mx-auto h-10 w-32' />
                        <h3 className="font-medium mt-1 text-black dark:text-white text-center text-lg">
                            Sign Up Now
                        </h3>
                    </div>


                    <form onSubmit={handleSubmit(handleRegister)}>
                        <div className="p-6.5">

                            {message && <div className='py-2'>
                                <div className={`${message?.type === 'error' ? 'bg-red-100 border border-orange-200 p-2 w-full rounded-md flex items-center mb-3' : 'bg-green-100 border border-green-200 p-2 w-full rounded-md flex items-center mb-3'}`}>
                                    {message?.type == 'error' && <MdErrorOutline className='text-2xl text-orange-500' />}
                                    {message?.type == 'success' && <MdOutlineDoneAll className='text-2xl text-green-500' />}
                                    <p className='text-black dark:text-white text-base ml-2'>{message?.message}</p>
                                </div>
                            </div>}

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        First name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your first name"
                                        className={`w-full rounded border-[1.5px]  bg-transparent py-3 px-5 text-black outline-none transition ${errors.first_name ? "border-red-500" : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'} disabled:cursor-default disabled:bg-whiter  dark:bg-form-input dark:text-white `}
                                        {...register("first_name", { required: true })}
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Last name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your last name"
                                        className={`w-full rounded border-[1.5px]  bg-transparent py-3 px-5 text-black outline-none transition ${errors.last_name ? "border-red-500" : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'} disabled:cursor-default disabled:bg-whiter  dark:bg-form-input dark:text-white`}
                                        {...register("last_name", { required: true })}
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
                                    className={`w-full rounded border-[1.5px]  bg-transparent py-3 px-5 text-black outline-none transition ${errors.username ? "border-red-500" : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'} disabled:cursor-default disabled:bg-whiter  dark:bg-form-input dark:text-white`}
                                    {...register("username", { required: true })}
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className={`w-full rounded border-[1.5px]  bg-transparent py-3 px-5 text-black outline-none transition ${errors.email ? "border-red-500" : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'} disabled:cursor-default disabled:bg-whiter  dark:bg-form-input dark:text-white`}
                                    {...register("email", { pattern: /(?=.*?[@])/, required: true })}
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Phone
                                </label>
                                <input
                                    type="number"
                                    placeholder="Enter your phone number"
                                    className={`w-full rounded border-[1.5px]  bg-transparent py-3 px-5 text-black outline-none transition ${errors.phone_no ? "border-red-500" : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'} disabled:cursor-default disabled:bg-whiter  dark:bg-form-input dark:text-white`}
                                    {...register("phone_no", { pattern: /(?=.*?[0-9])/, minLength: 11, required: true })}
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

                            <div className="mb-5.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Re-type Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Re-enter password"
                                    className={`w-full rounded border-[1.5px]  bg-transparent py-3 px-5 text-black outline-none transition ${(errors.confirm_password || (watch('password') !== watch('confirm_password'))) ? "border-red-500" : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'} disabled:cursor-default disabled:bg-whiter  dark:bg-form-input dark:text-white`}
                                    {...register("confirm_password", { required: true })}
                                />
                                {(watch('password') !== watch('confirm_password')) && <p className='text-xs text-red-500 mt-0.5'>Password not match</p>}
                            </div>

                            <button disabled={isLoading} className="flex w-full justify-center items-center rounded bg-primary disabled:bg-blue-300 disabled:cursor-not-allowed p-3 font-medium text-gray hover:bg-opacity-90">
                                {isLoading && <ImSpinner className="text-xl text-white animate-spin mr-1.5" />}
                                <p>Sign Up</p>
                            </button>

                            <div className="mt-6 text-center">
                                <p>
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-primary">
                                        Sign in
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
