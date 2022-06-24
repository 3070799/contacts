import React from "react";
import CloseButton from "../button/close/CloseButton";
import cl from './MyModal.module.css'

const MyModal = ({children, visible, setVisible}) => {

    const rootClasses = [cl.myModal]
    if(visible) {
        rootClasses.push(cl.active)
    }

    const closeModal = () => {
        setVisible(false)
    }

    return (
        <div style={{zIndex: '9999'}} className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
                <CloseButton close={closeModal}/>
                <div style={{padding: '10px'}}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MyModal;