import { Home } from 'lucide-react';
import CountUp from 'react-countup';

const CountHubs = () => {
  return (
    <div className="card mt-5">
        <div className="card-body">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-1 xl:grid-cols-5">
                <div className="px-3 py-6 text-center border rounded-md dark:border-zink-500 border-slate-200">
                    <div className="flex items-center justify-center size-12 mx-auto mb-4 rounded-md text-15 bg-custom-50 dark:bg-custom-500/20">
                        <Home className="text-custom-500 fill-custom-200 dark:fill-custom-500/30"></Home></div>
                    <h4 className="mb-2 fs-4xl"><CountUp className="counter-value" end={8000} />k</h4>
                    <p className="mb-0 text-slate-500 dark:text-zink-200">Lleno</p>
                </div>
                <div className="px-3 py-6 text-center border rounded-md dark:border-zink-500 border-slate-200">
                    <div className="flex items-center justify-center size-12 mx-auto mb-4 rounded-md text-15 bg-yellow-50 dark:bg-yellow-500/20">
                        <Home className="text-yellow-500 fill-yellow-200 dark:fill-yellow-500/30"></Home></div>
                    <h4 className="mb-2 fs-4xl"><CountUp className="counter-value" end={3000} />k</h4>
                    <p className="mb-0 text-slate-500 dark:text-zink-200">Vacio</p>
                </div>
                <div className="px-3 py-6 text-center border rounded-md dark:border-zink-500 border-slate-200">
                    <div className="flex items-center justify-center size-12 mx-auto mb-4 rounded-md text-15 bg-red-50 dark:bg-red-500/20">
                        <Home className="text-red-500 fill-red-200 dark:fill-red-500/30"></Home></div>
                    <h4 className="mb-2 fs-4xl"><CountUp className="counter-value" end={4500} />k</h4>
                    <p className="mb-0 text-slate-500 dark:text-zink-200">Por llenarse</p>
                </div>
                <div className="px-3 py-6 text-center border rounded-md dark:border-zink-500 border-slate-200">
                    <div className="flex items-center justify-center size-12 mx-auto mb-4 rounded-md text-15 bg-purple-50 dark:bg-purple-500/20">
                        <Home className="text-purple-500 fill-purple-200 dark:fill-purple-500/30"></Home></div>
                    <h4 className="mb-2 fs-4xl"><CountUp className="counter-value" end={6000} />k</h4>
                    <p className="mb-0 text-slate-500 dark:text-zink-200">Por vaciarse</p>
                </div>
                <div className="px-3 py-6 text-center border rounded-md dark:border-zink-500 border-slate-200">
                    <div className="flex items-center justify-center size-12 mx-auto mb-4 rounded-md text-15 bg-green-50 dark:bg-green-500/20">
                        <Home className="text-green-500 fill-green-200 dark:fill-green-500/30"></Home></div>
                    <h4 className="mb-2 fs-4xl"><CountUp className="counter-value" end={2600} />k</h4>
                    <p className="mb-0 text-slate-500 dark:text-zink-200">Ok</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CountHubs;
