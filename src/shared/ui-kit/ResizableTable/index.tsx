import styles from "./ResizableTable.module.css";
import { useResizableTable } from "./model";

type Cell = { readonly key: string; readonly value: string };
type Row = { readonly key: string; readonly cells: Cell[] };

type ResizableTableProps = {
  readonly headers: Cell[];
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
          {headersWithRefs.map(({ key, value, ref }) => (
            <th ref={ref} className={styles.tableHeader} key={key}>
              <span>{value}</span>
              <div
                onMouseDown={() => startResize(key)}
                className={`${styles.resizeTool} ${
                  activeKey === key ? styles.active : ""
                }`}
              />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(({ key, cells }) => (
          <tr key={key}>
            {cells.map(({ key, value }) => (
              <td key={key}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
