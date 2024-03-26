import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { X } from "lucide-react";
import { handleSearchUser } from "slices/app/user/reducer";
import { APIClient } from "helpers/api_helper";
import { startLoadingUsers } from "slices/app/user/thunks";

const api = new APIClient();

const SearchUser = () => {
    const [search, setSearch] = useState <string>('');
    const dispatch = useDispatch<any>()

    async function searchUsers () {
        if(search === '') return dispatch( startLoadingUsers() );
        const response: any = await api.get(`http://localhost:1000/api/v1/persona/search/${search}`, null)
        dispatch(handleSearchUser(response))
    }

    function clearSearch() {
        setSearch('')
        dispatch( startLoadingUsers() )
    }

    return (
        <React.Fragment>
            <div className="card mt-5">
                <div className="card-body">
                    <h6 className="mb-4 text-15">Buscador de Usuarios</h6>
                    <form>
                        <div className="grid grid-cols-1 gap-x-5 md:grid-cols-2 xl:grid-cols-2">
                            <div className="mb-4">
                                <label htmlFor="search" className="inline-block mb-2 text-base font-medium">DNI <span className="text-red-500">*</span></label>
                                <input 
                                    id="search"
                                    name="search"
                                    type="text" 
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" 
                                    placeholder="Buscar Usuario por DNI"  
                                    onChange={(e) => setSearch(e.target.value)} 
                                    value={search}
                                    required
                                />
                            </div>

                            <div className="mb-4 flex justify-center md:justify-start items-end gap-2">
                                <button onClick={ () => searchUsers() } disabled={search.length < 7} type="button" className="text-white transition-all duration-200 ease-linear btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 disabled:opacity-75 disabled:pointer-events-none">Buscar</button>
                                <button onClick={ clearSearch } type="button" className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-700 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10"><X className="inline-block size-4" /> <span className="align-middle">Limpiar</span></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            
        </React.Fragment>
    );
}

export default SearchUser;