import {
  DragEvent,
  RefObject,
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styles from './ResizableTable.module.css';
import cx from 'classnames';

type Header = { readonly key: string; readonly value: string };

type RowItemShape = {
  readonly id: number;
} & { [key: string]: string | number | null | undefined };

type ResizableTableProps<T extends RowItemShape> = {
  readonly headers: Header[];
  readonly rows: T[];
  readonly minCellWidth: number;
};

export const ResizableTable = <T extends RowItemShape>({
  headers,
  rows,
  minCellWidth,
}: ResizableTableProps<T>) => {
  const [cellsOrder, setCellsOrder] = useState(() =>
    headers.map((header) => header.key),
  );
  useEffect(() => {
    const persistedCellsOrder = localStorage.getItem('cellsOrder');
    if (persistedCellsOrder) {
      const parsed = JSON.parse(persistedCellsOrder) as string[];
      setCellsOrder(parsed);
    }
  }, []);
  const headersWithRefsDict = useMemo(
    () =>
      headers.reduce<{
        [key: Header['key']]: {
          value: Header['value'];
          ref: RefObject<HTMLTableCellElement>;
        };
      }>(
        (acc, current) => ({
          ...acc,
          [current.key]: {
            value: current.value,
            ref: createRef<HTMLTableCellElement>(),
          },
        }),
        {},
      ),
    [headers],
  );
  const tableRef = useRef<HTMLTableElement | null>(null);
  const [activeKey, setActiveKey] = useState<Header['key'] | null>(null);
  const startResize = (index: Header['key']) => setActiveKey(index);
  const endResize = () => setActiveKey(null);
  const mouseMove = useCallback(
    (event: MouseEvent) => {
      const gridColumns = cellsOrder.map((key) => {
        const { ref } = headersWithRefsDict[key];
        if (ref.current) {
          if (key === activeKey && ref.current) {
            const width = event.clientX - ref.current.offsetLeft;
            if (width > minCellWidth) {
              return `${width}px`;
            }
          }
          return `${ref.current.offsetWidth}px`;
        }
        return `${minCellWidth}px`;
      });
      if (tableRef.current) {
        tableRef.current.style.gridTemplateColumns = `${gridColumns.join(' ')}`;
      }
    },
    [activeKey, headersWithRefsDict, minCellWidth],
  );
  useEffect(() => {
    if (activeKey !== null) {
      window.addEventListener('mouseup', endResize);
      window.addEventListener('mousemove', mouseMove);
    }
    return () => {
      window.removeEventListener('mouseup', endResize);
      window.removeEventListener('mousemove', mouseMove);
    };
  }, [activeKey, mouseMove]);

  const onDragStart = (event: DragEvent<HTMLTableCellElement>) => {
    event.dataTransfer.setData('text/plain', event.currentTarget.id);
  };

  const onDragEnter = (event: DragEvent<HTMLTableCellElement>) => {
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = (event: DragEvent<HTMLTableCellElement>) => {
    event.preventDefault();
  };

  const onDrop = (event: DragEvent<HTMLTableCellElement>) => {
    const droppedIntoIndex = cellsOrder.indexOf(event.currentTarget.id);
    const movedIndex = cellsOrder.indexOf(
      event.dataTransfer.getData('text/plain'),
    );

    setCellsOrder((prevOrder) => {
      const copy = [...prevOrder];

      const moved = copy[movedIndex];
      const previous = copy[droppedIntoIndex];

      copy[droppedIntoIndex] = moved;
      copy[movedIndex] = previous;

      localStorage.setItem('cellsOrder', JSON.stringify(copy));

      return copy;
    });
  };

  return (
    <table ref={tableRef} className={styles.table}>
      <thead>
        <tr>
          {cellsOrder.map((key) => {
            const { value, ref } = headersWithRefsDict[key];

            return (
              <th
                key={key}
                id={key}
                ref={ref}
                draggable="true"
                onDragStart={onDragStart}
                onDragEnter={onDragEnter}
                onDrop={onDrop}
                onDragOver={onDragOver}
                className={styles.header}
              >
                <span>{value}</span>
                <div
                  onMouseDown={(event) => {
                    event.preventDefault();
                    startResize(key);
                  }}
                  className={cx(styles.resize, {
                    [styles.active]: activeKey === key,
                  })}
                />
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map(({ id, ...rest }) => (
          <tr key={id}>
            {cellsOrder.map((key) => (
              <td key={key}>{rest[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
