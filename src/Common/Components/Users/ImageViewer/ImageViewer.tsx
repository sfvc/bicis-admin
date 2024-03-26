import React, { useState } from "react";
import "./styles.css"

const ImageViewer = ({ src, alt, caption, label }: any) => {
    const [isOpen, setIsOpen] = useState <Boolean>(false)
    const showModal = () => setIsOpen(true)

    return (
      <React.Fragment>
        <div className="flex flex-col flex-grow">
          <label htmlFor="inputValue" className="inline-block mb-2 text-base font-bold">{label}</label>
          <button 
          type="button" 
          onClick={showModal}
          className="text-custom-500 btn border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">
              Ver
          </button>
        </div>

        {
          isOpen && (
            <div className="modal">
              <span className="close" onClick={() => setIsOpen(false)}>
                &times;
              </span>
              <div className="modal-content">
                <img className="" src={src} alt={alt} />
                {caption.length > 0 && <div className="caption">{caption}</div>}
              </div>
            </div>
          )

        }
      </React.Fragment>
    )
}

export default ImageViewer;

