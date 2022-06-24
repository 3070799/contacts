import React from 'react';
import MyButton from "../MyButton";
import closeImg from './img/windowclose_104378.png'
import cl from './CloseButton.module.css'

const CloseButton = ({close}) => {

    const btnStyles = {
        borderRadius: 15,
        padding: 0,
        color: 'black',
        display: 'inline-flex',
        border: 0
    }

    return (
        <div className={cl.closeDiv}>
            <MyButton style={btnStyles} onClick={() => close()}>
                <img src={closeImg} alt={'close'}/>
            </MyButton>
        </div>
    );
};

export default CloseButton;