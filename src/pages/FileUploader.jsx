import React , {useState} from 'react'

const FileUploader = () => {
    const [selectedFiles, setSelectFiles] = useState([]);

    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files)
        setSelectFiles(files);
    }

    const handleFileUpload = () => {
        console.log(selectedFiles)
    }

    return (
        <div className='drop-area' 
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        >

        <p>Drag your files google sheet</p>
        <button onClick={handleFileUpload}>Upload</button>
        {selectedFiles.map(file =>(
            <div key={file.name}>{file.name}</div>
        ))}
        </div>
    )
}

export default FileUploader;