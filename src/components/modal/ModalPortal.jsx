import { createPortal } from "react-dom";

function ModalPortal({ children }) {
  return createPortal(children, document.getElementById("root"));
}

export default ModalPortal;
