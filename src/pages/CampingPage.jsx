import { useGetCampingBasedList } from "@/api/camping.js";
import Pagination from "@/components/Pagination.jsx";
import styles from "@/styles/CampingPage.module.css";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";

const NUM_OF_ROWS = 10;

export default function CampingPage() {
  const navigate = useNavigate();

  const [pageNo, setPageNo] = useState(1);
  const { data, isLoading } = useGetCampingBasedList({ pageNo, numOfRows: NUM_OF_ROWS });

  return (
    <div className={styles.camping}>
      <h1>고캠핑 목록</h1>
      {isLoading ? (
        <p>로딩 중..</p>
      ) : (
        <>
          <div className={styles.scroll}>
            <ul className={styles.list}>
              {data.items.item.map((item) => (
                <div key={item.contentId}>
                  <li
                    onClick={() =>
                      navigate(item.contentId, {
                        state: {
                          camping: item,
                        },
                      })
                    }
                  >
                    <h2>{item.facltNm}</h2>
                    <span>{item.addr1}</span>
                    <Link to={item.contentId}>{item.facltNm}</Link>
                  </li>
                  <div className={styles.hr} />
                </div>
              ))}
            </ul>
          </div>
          <Pagination
            className={styles.pagination}
            currentPage={pageNo}
            totalPages={Math.ceil(data.totalCount / NUM_OF_ROWS)}
            onPageChange={(page) => setPageNo(page)}
          />
        </>
      )}
      <Outlet />
    </div>
  );
}
