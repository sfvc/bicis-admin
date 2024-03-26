import Select from "react-select";
import { bikesData } from "Common/data/table";
import { useSelector } from "react-redux";

const CustomSelect = ({ field, form, ...props }: any) => {
  const { layoutModeType } = useSelector( (state: any) => state.Layout)

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      borderColor: (layoutModeType === "light") ? "#E8EBEE" : "#1F344D",        
      borderRadius: "0.375rem", // Borde redondeado
      boxShadow: "none", // Sin sombra
      backgroundColor: (layoutModeType === "light") ? "#fff" : "#132337", // Color de fondo blanco
      paddingLeft: "12px",
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      display: "none", // Ocultar separador de indicadores
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: (layoutModeType === "light") ? "#2D3748" : "#B0BED1", // Color del indicador de despliegue
      fontSize: "0.4rem", // Tamaño del ícono del indicador de despliegue
      marginRight: 0, // Quitar margen de la derecha
      padding: 0, // Quitar padding
      width: "16px",
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: "0.375rem", // Borde redondeado para el menú desplegable
      borderColor: (layoutModeType === "light") ? "#E8EBEE" : "#1F344D",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)", // Sombra
      backgroundColor: (layoutModeType === "light") ? "#fff" : "#132337", // Color de fondo blanco
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      // backgroundColor: state.isSelected ? "#EDF2F7" : "#fff", // Color de fondo cuando está seleccionado
      backgroundColor: (layoutModeType === "light") ? "#fff" : "#132337", // Color de fondo blanco
      color: (layoutModeType === "light") ? "#2D3748" : "#B0BED1", // Color del texto cuando está seleccionado
      cursor: "pointer", // Cursor de puntero
      "&:hover": {
        backgroundColor: "#1967D2", // Color de fondo al pasar el mouse
      },
      paddingLeft: "1.6rem", // Agregar padding a la izquierda
      paddingTop: 0, 
      paddingBottom: 0,
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: (layoutModeType === "light") ? "#2D3748" : "#C8D7DD", // Color del texto seleccionado
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: (layoutModeType === "light") ? "#2D3748" : "#C8D7DD", // Color del texto del marcador de posición
    }),
  };
  
  const handleChange = (selectedOption: any) => {
    form.setFieldValue(field.name, selectedOption.value);
  };

  return (
    <>
      <Select
        {...field}
        {...props}
        styles={customStyles}
        options={bikesData}
        onChange={handleChange}
        value={field.value}
      />
    </>
  );
};

export default CustomSelect;