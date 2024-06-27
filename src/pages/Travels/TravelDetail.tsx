import React, { useEffect } from "react";
import TravelInfo from "Common/Components/Travels/DetailTravel/TravelInfo";
import DetailMap from "Common/Components/Travels/DetailTravel/DetailMap";
import TravelHistory from "Common/Components/Travels/DetailTravel/TravelHistory";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TravelDetail = () => {
  const { activeTravel } = useSelector((state: any) => state.Travel)
  const navigate = useNavigate()

  useEffect(() => {
    if(!activeTravel) return navigate("/viajes")
  }, [])
  
  
  return (
    <React.Fragment>
      {
        activeTravel &&  (
          <div className="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto">
              <TravelInfo />
              <DetailMap />
              <TravelHistory />
          </div>
        )
      }
    </React.Fragment>
  )
}

export default TravelDetail;
