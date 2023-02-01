import { createPortal } from "react-dom"

const Modal = ({ children }) => {
    return createPortal(<div className="fixed inset-0 z-50">{children}</div>, document.getElementById('modal-root'))
}

export default Modal