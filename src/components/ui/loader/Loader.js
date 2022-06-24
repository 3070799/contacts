import React from 'react';
import {Spinner} from "react-bootstrap";
import cl from './Loader.module.css'

const Loader = () => {
    return (
        <div className={cl.loader}>
            <Spinner className={cl.spinner} animation="border" variant="secondary"/>
        </div>
    );
};

export default Loader;