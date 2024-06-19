import { AlertCircle } from 'lucide-react';

const ErrorAlert = ({ message, className }: any) => {
    return (
        <div className={`${className} my-4 flex gap-1 px-4 py-3 text-sm text-red-500 border border-red-200 rounded-md md:items-center bg-red-50 dark:bg-red-400/20 dark:border-red-500/50`}>
            <AlertCircle className="h-4"></AlertCircle>
            <span className='font-bold'>Ups! </span> {message}
        </div>
    )
}

export default ErrorAlert;
