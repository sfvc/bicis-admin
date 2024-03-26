import CountUp from 'react-countup';
import { Bike, Map } from 'lucide-react'

const CountTravels = () => {
  return (
    <div className="card">
        <div className="card-body">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-1 xl:grid-cols-2">
                <div className="px-3 py-6 text-center border rounded-md dark:border-zink-500 border-slate-200">
                    <div className="flex items-center justify-center size-12 mx-auto mb-4 rounded-md text-15 bg-purple-50 dark:bg-purple-500/20">
                        <Bike className="text-purple-500 fill-purple-200 dark:fill-purple-500/30"></Bike></div>
                    <h4 className="mb-2 fs-4xl"><CountUp className="counter-value" end={3000} />k</h4>
                    <p className="mb-0 text-slate-500 dark:text-zink-200">Unidades Activas</p>
                </div>
                <div className="px-3 py-6 text-center border rounded-md dark:border-zink-500 border-slate-200">
                    <div className="flex items-center justify-center size-12 mx-auto mb-4 rounded-md text-15 bg-custom-50 dark:bg-custom-500/20">
                        <Map className="text-custom-500 fill-custom-200 dark:fill-custom-500/30"></Map></div>
                    <h4 className="mb-2 fs-4xl"><CountUp className="counter-value" end={8000} />k</h4>
                    <p className="mb-0 text-slate-500 dark:text-zink-200">Viajes en Curso</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CountTravels;
