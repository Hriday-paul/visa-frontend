import { useCallback, useEffect, useMemo, useState } from "react"
import { ImSpinner } from "react-icons/im";
import { MdErrorOutline, MdMarkEmailRead, MdOutlineDoneAll } from "react-icons/md";
import OTPInput from "react-otp-input";
import { useVerifyUserMutation } from "../../Redux/Features/BaseApi";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../Redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { updateUserVerified } from "../../Redux/Slices/UserSlice";
import { useCookies } from "react-cookie";

type message = { type: 'success' | 'error', message: string }

export default function Verify() {
    const [postVerify, { isLoading, isError, isSuccess, data, error }] = useVerifyUserMutation();
    const [otp, setOtp] = useState<string>('0');
    const [resendTimer, setResendTimer] = useState<number>(0);
    const [message, setMessage] = useState<message | null>(null);
    const navig = useNavigate();
    const userInfo = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const [, setCookie] = useCookies(['baerer-token']);

    const submitOtp = useCallback(() => {
        const local_store_email = localStorage.getItem('user_email');
        const email = userInfo?.email || local_store_email;
        if (!email) {
            console.log(email)
            return undefined;
        }
        postVerify({ email, code: otp })
    }, [otp])

    useEffect(() => {
        const email = localStorage.getItem('user_email');
        if (!email) {
            navig('/register')
        }
    }, [])

    const startTimer = useCallback(() => {
        const interval = setInterval(() => {
            setResendTimer((count) => {
                if (count <= 1) {
                    clearInterval(interval);
                }
                return count - 1;
            })
        }, 1000)
    }, []);

    const resendOtpFunc = () => {
        setResendTimer(120);
        startTimer()
    }

    useMemo(() => {
        if (isSuccess) {
            
            setCookie('baerer-token', data?.token?.access, {
                httpOnly: false,
                maxAge: 14 * 24 * 60 * 60, // 7 days
                path: '/',
                sameSite: 'lax',
                secure: import.meta.env.VITE_NODE_ENV === 'production',
            });
            dispatch(updateUserVerified({ isVerified: true, email: data?.email, fullName: data?.first_name + ' ' + data?.last_name, phone: data?.phone_no, userName: data?.username }))
            localStorage.removeItem('user_email');
            setMessage({ type: 'success', message: data?.message });
            navig('/dashboard');
        }
        if (isError) {
            const errType = error as { data: { message: string } }
            setMessage({ type: 'error', message: errType?.data?.message || 'something went wrong, try again' })
        }
    }, [isSuccess, isError]);

    return (

        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
            <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded">
                {message && <div className='py-2'>
                    <div className={`${message?.type === 'error' ? 'bg-red-100 border border-orange-200 p-2 w-full rounded-md flex items-center mb-3' : 'bg-green-100 border border-green-200 p-2 w-full rounded-md flex items-center mb-3'}`}>
                        {message?.type == 'error' && <MdErrorOutline className='text-2xl text-orange-500' />}
                        {message?.type == 'success' && <MdOutlineDoneAll className='text-2xl text-green-500' />}
                        <p className='text-black dark:text-white text-base ml-2'>{message?.message}</p>
                    </div>
                </div>}

                <MdMarkEmailRead className="text-7xl text-primary mx-auto my-5" />

                <div className="mx-auto flex w-full max-w-md flex-col space-y-8">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="text-black font-semibold text-3xl">
                            <p>Email Verification</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-slate-800">
                            <p>We have sent a code to your email</p>
                        </div>
                    </div>

                    <div className="mx-auto">
                        <OTPInput
                            inputStyle='inputStyle'
                            value={otp}
                            onChange={setOtp}
                            numInputs={4}
                            inputType="text"
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => <input {...props} />}
                        />

                        <div className="flex flex-row gap-x-5 items-center">
                            <button onClick={resendOtpFunc} disabled={resendTimer !== 0} className="flex w-full justify-center items-center rounded bg-primary disabled:bg-blue-300 disabled:cursor-not-allowed p-3 font-medium text-gray hover:bg-opacity-90 mt-8 mb-5">
                                <p>{(resendTimer == 0) ? 'Resend' : Math.floor(resendTimer / 60) + 'm' + ' ' + resendTimer % 60 + 's'}</p>
                            </button>
                            <button onClick={submitOtp} disabled={isLoading || otp.length < 4} className="flex w-full justify-center items-center rounded bg-primary disabled:bg-blue-300 disabled:cursor-not-allowed p-3 font-medium text-gray hover:bg-opacity-90 mt-8 mb-5">
                                {isLoading && <ImSpinner className="text-xl text-white animate-spin mr-1.5" />}
                                <p>VERIFY NOW</p>
                            </button>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}
