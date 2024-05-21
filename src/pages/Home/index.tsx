import { ResizableTable } from "../../shared/ui-kit/ResizableTable";
import styles from "./Home.module.css";

const data = [
  { id: 1, name: "Футболка", status: "Готов", price: "100", size: "L" },
  { id: 2, name: "Штаны", status: "Готов", price: "500", size: "M" },
  { id: 3, name: "Шорты", status: "Готов", price: "200", size: "S" },
];

export const Home = () => (
  <div className={styles.card}>
    <div>Resizable table</div>
    <ResizableTable
      headers={[
        { key: "name", value: "Продукт" },
        { key: "status", value: "Статус" },
        { key: "size", value: "Размер" },
        { key: "price", value: "Цена" },
      ]}
      rows={data}
      minCellWidth={100}
    />
  </div>
);
