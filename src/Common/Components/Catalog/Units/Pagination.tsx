import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { startPaginateUnits } from "slices/app/catalog/units/thunks";

const INITIAL_PAGE = 1;

const Pagination = ({ data }: any) => {
    const { pageSize, hasNextPage, hasPreviousPage, total, totalPages } = data;
    const [currentPage, setCurrentPage] = useState<number>(INITIAL_PAGE);
    const [pageNumbers, setPageNumbers] = useState<number[]>([]);
    const dispatch = useDispatch<any>();

    const handleprevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            dispatch( startPaginateUnits(currentPage - 1) )
        }
    };
      
    const handlenextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            dispatch( startPaginateUnits(currentPage + 1) )
        }
    };

    const calculatePageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        setPageNumbers(pageNumbers);
    };

    const handleClick = (page: any) => {
        setCurrentPage(page);
        dispatch( startPaginateUnits(page) )
    };

    useEffect(() => {
        calculatePageNumbers()
        setCurrentPage(currentPage)
    }, [])

    return (
        <React.Fragment>
            <div className="flex flex-col items-center mb-5 md:flex-row mt-5">
                <div className="mb-4 grow md:mb-0">
                    <p className="text-slate-500 dark:text-zink-200">Showing <b>{pageSize}</b> of <b>{total}</b> Results</p>
                </div>
                <ul className="flex flex-wrap items-center gap-2 shrink-0">
                    { !hasPreviousPage ? (
                        <Link className="inline-flex items-center justify-center bg-white dark:bg-zink-700 h-8 px-3 transition-all duration-150 ease-linear border rounded border-slate-200 dark:border-zink-500 text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-100 dark:hover:bg-custom-500/10 focus:bg-custom-50 dark:focus:bg-custom-500/10 focus:text-custom-500 dark:focus:text-custom-500 [&.active]:text-white dark:[&.active]:text-white [&.active]:bg-custom-500 dark:[&.active]:bg-custom-500 [&.active]:border-custom-500 dark:[&.active]:border-custom-500 [&.active]:hover:text-custom-700 dark:[&.active]:hover:text-custom-700 [&.disabled]:text-slate-400 dark:[&.disabled]:text-zink-300 [&.disabled]:cursor-auto disabled" to="#!">
                            <ChevronLeft className="size-4 mr-1 rtl:rotate-180" /> Prev
                        </Link>
                    ) :
                        <li className={ !hasPreviousPage ? "disabled" : ""}>
                            <Link to={`?page=${currentPage - 1}`} onClick={handleprevPage} className="inline-flex items-center justify-center bg-white dark:bg-zink-700 h-8 px-3 transition-all duration-150 ease-linear border rounded border-slate-200 dark:border-zink-500 text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-100 dark:hover:bg-custom-500/10 focus:bg-custom-50 dark:focus:bg-custom-500/10 focus:text-custom-500 dark:focus:text-custom-500 [&.active]:text-white dark:[&.active]:text-white [&.active]:bg-custom-500 dark:[&.active]:bg-custom-500 [&.active]:border-custom-500 dark:[&.active]:border-custom-500 [&.active]:hover:text-custom-700 dark:[&.active]:hover:text-custom-700 [&.disabled]:text-slate-400 dark:[&.disabled]:text-zink-300 [&.disabled]:cursor-auto" >
                                <ChevronLeft className="size-4 mr-1 rtl:rotate-180" /> Prev
                            </Link>
                        </li>
                    }

                    {pageNumbers.map((item, index) => (
                        <React.Fragment key={index}>
                            <li>
                                <Link to={`?page=${item}`} onClick={() => handleClick(item)} className={currentPage === item ? "inline-flex items-center justify-center bg-white dark:bg-zink-700 h-8 px-3 transition-all duration-150 ease-linear border rounded border-slate-200 dark:border-zink-500 text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-100 dark:hover:bg-custom-500/10 focus:bg-custom-50 dark:focus:bg-custom-500/10 focus:text-custom-500 dark:focus:text-custom-500 [&.active]:text-white dark:[&.active]:text-white [&.active]:bg-custom-500 dark:[&.active]:bg-custom-500 [&.active]:border-custom-500 dark:[&.active]:border-custom-500 [&.active]:hover:text-custom-700 dark:[&.active]:hover:text-custom-700 [&.disabled]:text-slate-400 dark:[&.disabled]:text-zink-300 [&.disabled]:cursor-auto active" : "inline-flex items-center justify-center bg-white dark:bg-zink-700 h-8 px-3 transition-all duration-150 ease-linear border rounded border-slate-200 dark:border-zink-500 text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-100 dark:hover:bg-custom-500/10 focus:bg-custom-50 dark:focus:bg-custom-500/10 focus:text-custom-500 dark:focus:text-custom-500 [&.active]:text-white dark:[&.active]:text-white [&.active]:bg-custom-500 dark:[&.active]:bg-custom-500 [&.active]:border-custom-500 dark:[&.active]:border-custom-500 [&.active]:hover:text-custom-700 dark:[&.active]:hover:text-custom-700 [&.disabled]:text-slate-400 dark:[&.disabled]:text-zink-300 [&.disabled]:cursor-auto"}>{item}</Link>
                            </li>
                        </React.Fragment>
                    ))}

                    { !hasNextPage ? (
                        <Link className="inline-flex items-center justify-center bg-white dark:bg-zink-700 h-8 px-3 transition-all duration-150 ease-linear border rounded border-slate-200 dark:border-zink-500 text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-100 dark:hover:bg-custom-500/10 focus:bg-custom-50 dark:focus:bg-custom-500/10 focus:text-custom-500 dark:focus:text-custom-500 [&.active]:text-white dark:[&.active]:text-white [&.active]:bg-custom-500 dark:[&.active]:bg-custom-500 [&.active]:border-custom-500 dark:[&.active]:border-custom-500 [&.active]:hover:text-custom-700 dark:[&.active]:hover:text-custom-700 [&.disabled]:text-slate-400 dark:[&.disabled]:text-zink-300 [&.disabled]:cursor-auto disabled" to="#!">
                            Next <ChevronRight className="size-4 ml-1 rtl:rotate-180" />
                        </Link>
                    ) :
                        <li className={ !hasNextPage ? "disabled" : ""}>
                            <Link to={`?page=${currentPage + 1}`} onClick={handlenextPage} className="inline-flex items-center justify-center bg-white dark:bg-zink-700 h-8 px-3 transition-all duration-150 ease-linear border rounded border-slate-200 dark:border-zink-500 text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-100 dark:hover:bg-custom-500/10 focus:bg-custom-50 dark:focus:bg-custom-500/10 focus:text-custom-500 dark:focus:text-custom-500 [&.active]:text-white dark:[&.active]:text-white [&.active]:bg-custom-500 dark:[&.active]:bg-custom-500 [&.active]:border-custom-500 dark:[&.active]:border-custom-500 [&.active]:hover:text-custom-700 dark:[&.active]:hover:text-custom-700 [&.disabled]:text-slate-400 dark:[&.disabled]:text-zink-300 [&.disabled]:cursor-auto" >Next <ChevronRight className="size-4 ml-1 rtl:rotate-180" /></Link>
                        </li>
                    }
                </ul>
            </div>
        </React.Fragment>
    );
};

export default Pagination;
