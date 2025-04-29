import styles from "@/styles/Modal.module.css";

function ModalOverlay({ onClose }) {
  return <div className={styles.overlay} onClick={onClose} />;
}

export default ModalOverlay;
