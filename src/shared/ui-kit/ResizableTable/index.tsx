import styles from "./ResizableTable.module.css";
import { useResizableTable } from "./model";

type Cell = readonly [string, string];

type Row = readonly [string, Cell[]];

type ResizableTableProps = {
  readonly headers: { readonly key: string; readonly value: string }[];
  readonly rows: Row[];
  readonly minCellWidth: number;
};

export const ResizableTable = ({
  headers,
  rows,
  minCellWidth,
}: ResizableTableProps) => {
  const { tableRef, headersWithRefs, startResize, activeKey } =
    useResizableTable({
      minCellWidth,
      headers,
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
          {headersWithRefs.map(({ key, value, ref }, index) => (
            <th ref={ref} className={styles.tableHeader} key={key}>
              <span>{value}</span>
              <div
                onMouseDown={() => startResize(index)}
                className={`${styles.resizeTool} ${
                  activeKey === index ? styles.active : ""
                }`}
              />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(([id, cells]) => (
          <tr key={id}>
            {cells.map(([key, value]) => (
              <td key={key}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
