import styles from "@/styles/CampingModal.module.css";
import { useLoaderData, useLocation, useNavigate } from "react-router";
import BaseModal from "./modal/BaseModal.jsx";

function CampingModal() {
  const {
    state: { camping },
  } = useLocation();
  const { imgData } = useLoaderData();
  const navigate = useNavigate();

  const showIntro = camping.lineIntro !== "" || camping.intro !== "";

  return (
    <BaseModal className={styles.modal} onClose={() => navigate("/camping")} isOpen>
      <h2>{camping.facltNm}</h2>
      {showIntro && (
        <section className={styles.intro}>
          <h3>소개</h3>
          <span>{camping.lineIntro}</span>
          <p>{camping.intro}</p>
        </section>
      )}

      <dl className={styles.etc}>
        <dt>주소</dt>
        <dd>{camping.addr1}</dd>
        {camping.tooltip !== "" && (
          <>
            <dt>특징</dt>
            <dd>{camping.tooltip}</dd>
          </>
        )}
      </dl>
    </BaseModal>
  );
}

export default CampingModal;
