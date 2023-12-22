import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

// STYLES
import './styles.scss'

interface ComponentState {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
    name: string
}

const bc: string = 'dropzone'

function Dropzone({ setFieldValue, name }: ComponentState) {
    // const pic: any = []
    const [pic, setPic]: any[] = useState([])
    const [selectedPics, setSelectedPics]: any[] = useState([])
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length === 0) { return; }
        // on drop we add to the existing files
        acceptedFiles.forEach((file: any) => {
            setSelectedPics([...selectedPics, file.name])
            const reader = new FileReader();
            reader.onload = (fileLoadedEvent: any) => {
                // pic.push(fileLoadedEvent.target.result)
                setPic([...pic, fileLoadedEvent.target.result])
            }
            reader.readAsDataURL(file);
        })
        setFieldValue("pictures", pic);
    }, [pic, setFieldValue])

    const { getRootProps, getInputProps, isDragActive /*acceptedFiles*/ } = useDropzone({
        onDrop,
        accept: 'image/png,image/jpeg,image/jpg',
        minSize: 0
    })
    // let files: any = 'Select 2 images'
    // if (acceptedFiles.length <= 2) {
    if (selectedPics.length <= 2) {
        // files = acceptedFiles.map((file: File) => {
        selectedPics.map((file: File) => {
            return (
                <div key={file.name}>
                    <li className="selected-images">
                        {file.name}
                        <button className='add-button'
                            onClick={() => {
                                const index: number = selectedPics.indexOf(file)
                                selectedPics.splice(index, 1)
                            }}>
                            X </button>
                    </li>
                </div>)
        }
        );
    }

    return (
        <div>
            <div className={`${bc}`}>
                <div  {...getRootProps()} >
                    <input name={name}  {...getInputProps()} className={`input`} />
                    {
                        isDragActive ?
                            <p  >Drop the files here ...</p> :
                            <div>
                                Drag your images here or
                            <button className='add-button'
                                    type="button"> Select
                        </button>
                            </div>
                    }

                </div>
            </div>
            <div className='margin-top'>
                <h4>Selected Images</h4>
                <ul>{selectedPics}</ul>
            </div>
        </div>
    )
}

export default Dropzone
