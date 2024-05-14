import React, { useState, useEffect } from 'react';
import PigBadge from './Ui/Label/PigBadge';

interface CronometroProps {
  fechaInicio: string;
}

const Cronometro: React.FC<CronometroProps> = ({ fechaInicio }) => {
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Calcula el tiempo transcurrido en minutos
      const inicio = new Date(fechaInicio).getTime();
      const ahora = new Date().getTime();
      const diferencia = ahora - inicio;
      const tiempoEnMinutos = Math.floor(diferencia / (1000 * 60));

      // Actualiza el estado con el tiempo transcurrido en minutos
      setTiempoTranscurrido(tiempoEnMinutos);
    }, 1000); // Actualiza cada segundo

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, [fechaInicio]);

  // Calcula horas y minutos a partir del tiempo en minutos
  const horas: number = Math.floor(tiempoTranscurrido / 60);
  const minutos: number = tiempoTranscurrido % 60;

  return (
    <div>
      {/* <p>{horas}:{minutos}</p> */}
      <PigBadge 
        color="custom" 
        label={`${horas}:${minutos}`} 
      />
    </div>
  );
};

export default Cronometro;
