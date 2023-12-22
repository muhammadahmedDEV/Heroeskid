// MAIN MODULES
import React from 'react';

// STYLES
import './styles.scss'

interface ComponentProps {
    message: string
    heading: string
}
const errorModal = ({ message, heading }: ComponentProps) => {
    const Modal: any = document.getElementById('modalBtn');
    Modal.click();
    return (
        <div>
            <button type="button" style={{ display: 'none' }} id="modalBtn" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>
            < div id="myModal" className="modal fade" role="dialog" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h3 className="modal-title" style={{ color: 'red' }}>{heading}</h3>
                        </div>
                        <div className="modal-body">
                            <h5>{message}</h5>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal" >Close</button>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default errorModal
