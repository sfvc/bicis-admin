import React from "react";

const NoResults = ({data}: any) => {
    return (
        <React.Fragment>
            {
                (data.length === 0) && (
                    <span className="block mt-5 text-center">No se encontraron resultados</span>
                )
            }
        </React.Fragment>
    )
}

export default NoResults;
