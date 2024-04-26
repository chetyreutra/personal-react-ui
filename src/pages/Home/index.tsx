import { ResizableTable } from "../../shared/ui-kit/ResizableTable";
import styles from "./Home.module.css";

export const Home = () => {
  return (
    <div className={styles.card}>
      <div>Resizable table</div>
      <ResizableTable
        headers={[
          { key: "1", value: "Продукт" },
          { key: "2", value: "Айди" },
          { key: "3", value: "Статус" },
        ]}
        rows={[
          [
            "1",
            [
              ["11", "Товар 1"],
              ["11", "Айди 1"],
              ["11", "Готов 1"],
            ],
          ],
          [
            "2",
            [
              ["11", "Товар 2"],
              ["11", "Айди 2"],
              ["11", "Готов 2"],
            ],
          ],
          [
            "3",
            [
              ["11", "Товар 3"],
              ["11", "Айди 3"],
              ["11", "Готов 3"],
            ],
          ],
        ]}
        minCellWidth={100}
      />
    </div>
  );
};
