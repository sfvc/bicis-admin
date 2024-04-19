import React from "react";
import TravelInfo from "Common/Components/Travels/DetailTravel/TravelInfo";
import DetailMap from "Common/Components/Travels/DetailTravel/DetailMap";

const TravelDetail = () => {
  console.log('detalle') //TODO: Eliminar
  
  return (
    <React.Fragment>
        <div className="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto">
            {/* TODO: Agregar componentes de la vista */}
            <TravelInfo />
            <DetailMap />
        </div>
    </React.Fragment>
  )
}

export default TravelDetail;
