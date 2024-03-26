import CountUp from 'react-countup';
import { User, Users } from 'lucide-react'

const CountUsers = () => {
  return (
    <div className="card mt-5">
        <div className="card-body">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-1 xl:grid-cols-3">
                <div className="px-3 py-6 text-center border rounded-md dark:border-zink-500 border-slate-200">
                    <div className="flex items-center justify-center size-12 mx-auto mb-4 rounded-md text-15 bg-custom-50 dark:bg-custom-500/20">
                        <User className="text-custom-500 fill-custom-200 dark:fill-custom-500/30"></User></div>
                    <h4 className="mb-2 fs-4xl"><CountUp className="counter-value" end={8000} />k</h4>
                    <p className="mb-0 text-slate-500 dark:text-zink-200">Usuarios Activos</p>
                </div>
                <div className="px-3 py-6 text-center border rounded-md dark:border-zink-500 border-slate-200">
                    <div className="flex items-center justify-center size-12 mx-auto mb-4 rounded-md text-15 bg-red-50 dark:bg-red-500/20">
                        <User className="text-red-500 fill-red-200 dark:fill-red-500/30"></User></div>
                    <h4 className="mb-2 fs-4xl"><CountUp className="counter-value" end={3000} />k</h4>
                    <p className="mb-0 text-slate-500 dark:text-zink-200">Usuarios Inactivos</p>
                </div>
                <div className="px-3 py-6 text-center border rounded-md dark:border-zink-500 border-slate-200">
                    <div className="flex items-center justify-center size-12 mx-auto mb-4 rounded-md text-15 bg-green-50 dark:bg-green-500/20">
                        <Users className="text-green-500 fill-green-200 dark:fill-green-500/30"></Users></div>
                    <h4 className="mb-2 fs-4xl"><CountUp className="counter-value" end={4645} />k</h4>
                    <p className="mb-0 text-slate-500 dark:text-zink-200">Total de Usuarios</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CountUsers;
