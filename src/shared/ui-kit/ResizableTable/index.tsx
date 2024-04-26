import styles from "./ResizableTable.module.css";
import { useResizableTable } from "./model";

type ResizableTableProps = {
  readonly minCellWidth: number;
};

export const ResizableTable = ({ minCellWidth }: ResizableTableProps) => {
  const { tableRef, columns, mouseDown, activeIndex } = useResizableTable({
    minCellWidth,
  });

  return (
    <table
      ref={tableRef}
      className={styles.table}
      style={{
        gridTemplateColumns: `${minCellWidth}px ${minCellWidth}px ${minCellWidth}px`,
      }}
    >
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th
              ref={column.ref}
              className={styles.tableHeader}
              key={column.header}
            >
              <span>{column.header}</span>
              <div
                onMouseDown={() => mouseDown(index)}
                className={`${styles.resizeTool} ${
                  activeIndex === index ? styles.active : ""
                }`}
              />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Товар 1</td>
          <td>5531234</td>
          <td>Готов к получению</td>
        </tr>
        <tr>
          <td>Товар 2</td>
          <td>5531234</td>
          <td>Готов к получению</td>
        </tr>
        <tr>
          <td>Товар 3</td>
          <td>5531234</td>
          <td>Готов к получению</td>
        </tr>
        <tr>
          <td>Товар 4</td>
          <td>5531234</td>
          <td>Готов к получению</td>
        </tr>
      </tbody>
    </table>
  );
};
