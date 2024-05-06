import React, { useState } from 'react';
import './FileUpload.css';
import { transformEnvKeys } from '../utils/utils.ts';
import Cross from '../../assets/UpCross.svg';
import Delete from '../../assets/DeleteIcon.svg';
import { EnvKeyValue, FileUploadProps } from '../types/types.ts';
import { CLICK_OR_DRAG, UPLOAD_FILE } from '../constants/stringConstants.ts';

const FileUpload: React.FC<FileUploadProps> = ({ addEnvKeys, closeUpload, env }) => {
    const [envContent, setEnvContent] = useState<Array<EnvKeyValue>>(env);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const removePair = (keyToRemove: string) => {
        console.log("remmm", keyToRemove);
        const newState = envContent.filter(item => item.key !== keyToRemove);
        setEnvContent(newState);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (file.size > 5 * 1024) {
            setErrorMessage('File size exceeds 5KB limit.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            setEnvContent(transformEnvKeys(content));
        };
        reader.readAsText(file);
    };

    const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files?.[0];

        if (!file) return;

        if (file.size > 5 * 1024) {
            setErrorMessage('File size exceeds 5KB limit.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            setEnvContent(transformEnvKeys(content));
        };
        reader.readAsText(file);
    };

    return (
        <div className='upload-container'>
            <img src={Cross} alt='' className='cross' onClick={closeUpload} />
            <div className="file-upload-container">
                {envContent.length === 0 ? <><label
                    className="file-upload-area"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    htmlFor="fileInput"
                >
                    <p className='dragger'>{CLICK_OR_DRAG}</p>
                    <input
                        id="fileInput"
                        type="file"
                        accept=".env"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </label>
                    <div className='upload-sub-heading'>{UPLOAD_FILE}</div></> :
                    <div className='layer-inputs'>{envContent.map((content) => {
                        return <div className='inputs'>
                            <div className='key-input-container'>
                                <label>Name</label>
                                <input className='key-input' value={content.key} />
                            </div>
                            <div className='key-input-container'>
                                <label>Value</label>
                                <input className='key-input' value={content.value} />
                            </div>
                            <img src={Delete} alt='' onClick={() => removePair(content.key)} />
                        </div>
                    })}</div>
                }
                <div className='buttons'>
                    <button onClick={closeUpload} className='cancel-button'>Cancel</button>
                    <button disabled={envContent.length === 0} className='add-button' onClick={() => addEnvKeys(envContent)}>Add</button>
                </div>
                {errorMessage && <p>{errorMessage}</p>}
            </div>
        </div>
    );
};

export default FileUpload;
