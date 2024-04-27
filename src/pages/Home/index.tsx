import { ResizableTable } from "../../shared/ui-kit/ResizableTable";
import styles from "./Home.module.css";

export const Home = () => (
  <div className={styles.card}>
    <div>Resizable table</div>
    <ResizableTable
      headers={[
        { key: "1", value: "Продукт" },
        { key: "2", value: "Айди" },
        { key: "3", value: "Статус" },
      ]}
      rows={[
        {
          key: "1",
          cells: [
            {
              key: "name",
              value: "Товар 1",
            },
            {
              key: "id",
              value: "Айди 1",
            },
            {
              key: "status",
              value: "Готов 1",
            },
          ],
        },
      ]}
      minCellWidth={100}
    />
  </div>
);
