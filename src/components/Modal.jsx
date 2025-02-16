// Modal is basically a popup overlay on the screen. In this case, it will be used to get info about the moves a pokemon has
import ReactDom from 'react-dom';


export default function Modal(props){
    const { children, handleCloseModal } = props;

    return ReactDom.createPortal(
        <div className='modal-container'>
            {/*This will be the section outside tthe popup box where if it is clicked, it will close the popup*/}
            <button onClick={handleCloseModal} className='modal-underlay'/>
            <div className='modal-content'>
                {children}
            </div>
        </div>,
        // rendering it on a div with id 'portal' in 'index.html'
        document.getElementById('portal')
    )
}