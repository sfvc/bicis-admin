import React, { useState } from "react";
import axios from "axios";
import { Ban, Check } from "lucide-react";
import Spinner from "Common/Components/Spinner";

interface PropFile {
    input: string,
    src: string,
    alt: string,
    handleInputChange: (fieldName: string, value: string) => void;
}

const UploadFile = ({ input, src, alt, handleInputChange }: PropFile) => {
    const [file, setFile] = useState<any>(null);
    const [message, setMessage] = useState<string>('');
    const [status, setStatus] = useState<string | null>(null);
    const [url, setUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChangeDoc = async (e: any) => {
        setIsLoading(true)
        const fieldName = e.target.name

        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        } else {
            setFile(null);
            return null
        }

        const formData = new FormData();
        formData.append('file', e.target.files[0]);

        try {
            const authUser = localStorage.getItem("authUser");
            if(!authUser) return null
            const {token} = JSON.parse(authUser)

            const response: any = await axios.post('http://localhost:1000/api/v1/upload', formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
                }
            });

            // Agrego la nueva url al formulario de edicion de datos
            handleInputChange(fieldName, response.url)
            handleMessage('Exito', 'Archivo subido exitosamente.', response.url)
        } catch (error) {
            handleMessage('Error', 'Error al subir el archivo.', null)
        }
    };

    const handleMessage = (status: string, msg: string, url: string|null) => {
        setUrl(url)
        setMessage(msg);
        setStatus(status)
        setIsLoading(false)
    }

    return (
      <React.Fragment>
        <div className="flex justify-center">
            {
                isLoading
                    ? <Spinner />
                    : (<img className="w-64 h-56" src={url || src} alt={alt} />)
            }
        </div>

        <div className="mt-8 px-4">
            <input 
                id={input}
                type="file" 
                name={input} 
                className="cursor-pointer form-file form-file-sm border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500" 
                onChange={(e) => handleChangeDoc(e)}
            />
        </div>

        {
            (status === 'Exito' && !isLoading) &&
            (<div className="m-4 px-3 py-2 text-sm text-green-500 border border-green-200 rounded-md bg-green-50 dark:bg-green-400/20 dark:border-green-500/50">
                <Check className="mr-1 inline-block size-4 text-green-500 fill-green-100 dark:fill-green-500/20"></Check>
                {message}
            </div>)
        }

        {
            (status === 'Error' && !isLoading) &&
            (<div className="m-4 px-3 py-2 text-sm text-red-500 border border-red-200 rounded-md bg-red-50 dark:bg-red-400/20 dark:border-red-500/50">
                <Ban className="mr-1 inline-block size-4 text-red-500 fill-red-100 dark:fill-red-500/20"></Ban>
                {message}
            </div>)
        } 
      </React.Fragment>
    )
}

export default UploadFile;
