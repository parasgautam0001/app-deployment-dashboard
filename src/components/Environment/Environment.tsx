import React, { useEffect, useState } from "react";
import './Environment.css';
import FileUpload from "../FileUpload/FileUpload.tsx";
import Plus from './../../assets/PlusIcon.svg';
import Upload from './../../assets/Up.svg';
import Delete from './../../assets/DeleteIcon.svg';
import { EnvKeyValue } from "../types/types.ts";
import { ENVIRONMENT_VARIABLES } from "../constants/stringConstants.ts";

const Environment = () => {
    const [showUpload, setShowUpload] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [envPairs, setEnvPairs] = useState<EnvKeyValue[]>([]);

    useEffect(() => {
        if (localStorage.getItem('envKeys')) setEnvPairs(JSON.parse(localStorage.getItem('envKeys') || '{}'));
    }, []);

    const handleEnvKeys = (content: Array<EnvKeyValue>) => {
        if (content.length === 0) return;
        setShowUpload(false);
        setShowEdit(false);
        const pairs = content;
        localStorage.setItem('envKeys', JSON.stringify(pairs));
        setEnvPairs(pairs);
    };

    const removePair = (keyToRemove: string) => {
        const newState = envPairs.filter(item => item.key !== keyToRemove);
        setEnvPairs(newState);
        localStorage.setItem('envKeys', JSON.stringify(newState));
    };

    return (
        <div className="env-container">
            <div className="env-header-container">
                <div>{ENVIRONMENT_VARIABLES}</div>
                <div className="env-buttons">
                    <img className="pointers" alt='' src={Plus} onClick={() => setShowEdit(true)} />
                    <img className="pointers" alt='' src={Upload} onClick={() => setShowUpload(true)} />
                </div>
            </div>
            {envPairs.length !== 0 ?
                <div className="pairs">
                    {envPairs.map((content) => {
                        return <div className="main-key-container">
                            <div>{content.key}</div>
                            <div>{content.value}</div>
                            <img src={Delete} alt='' onClick={() => removePair(content.key)} />
                        </div>
                    })}</div>
                : <div>No environment variable created</div>}
            {showEdit && <FileUpload addEnvKeys={(val) => handleEnvKeys(val)} closeUpload={() => setShowEdit(false)} env={envPairs} />}
            {showUpload && <FileUpload addEnvKeys={(val) => handleEnvKeys(val)} closeUpload={() => setShowUpload(false)} env={[]} />}
        </div>
    )
};

export default Environment;