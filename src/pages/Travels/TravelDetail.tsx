import React from "react";
import TravelInfo from "Common/Components/Travels/DetailTravel/TravelInfo";
import DetailMap from "Common/Components/Travels/DetailTravel/DetailMap";
import TravelHistory from "Common/Components/Travels/DetailTravel/TravelHistory";

const TravelDetail = () => {
  console.log('detalle') //TODO: Eliminar
  
  return (
    <React.Fragment>
        <div className="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto">
            <TravelInfo />
            <DetailMap />
            <TravelHistory />
        </div>
    </React.Fragment>
  )
}

export default TravelDetail;
