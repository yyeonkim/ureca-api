import styles from "@/styles/Modal.module.css";
import { useEffect } from "react";
import ModalOverlay from "./ModalOverlay.jsx";
import ModalPortal from "./ModalPortal.jsx";

function BaseModal({ children, onClose, isOpen, className }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  return isOpen ? (
    <ModalPortal>
      <div role="dialog" className={styles.base} aria-modal="true" aria-hidden="true">
        <ModalOverlay onClose={onClose} />
        <div className={`${styles.content} ${className}`}>{children}</div>
      </div>
    </ModalPortal>
  ) : null;
}

export default BaseModal;
