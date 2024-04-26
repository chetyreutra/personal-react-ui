import { ResizableTable } from "../../shared/ui-kit/ResizableTable";
import styles from "./Home.module.css";

export const Home = () => {
  return (
    <div className={styles.card}>
      <div>Resizable table</div>
      <ResizableTable minCellWidth={100} />
    </div>
  );
};
