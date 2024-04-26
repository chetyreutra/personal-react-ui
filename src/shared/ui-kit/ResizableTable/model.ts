import {
  useMemo,
  createRef,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";

type UseResizableTableParams<T> = {
  readonly minCellWidth: number;
  readonly headers: T[];
};

export const useResizableTable = <T extends Record<string, string>>({
  minCellWidth,
  headers,
}: UseResizableTableParams<T>) => {
  const headersWithRefs = useMemo(
    () =>
      headers.map((header) => ({
        ...header,
        ref: createRef<HTMLTableCellElement>(),
      })),
    [headers]
  );

  const tableRef = useRef<HTMLTableElement | null>(null);

  const [activeKey, setActiveKey] = useState<number | null>(null);

  const startResize = (index: number) => setActiveKey(index);

  const endResize = () => setActiveKey(null);

  const mouseMove = useCallback(
    (event: MouseEvent) => {
      const gridColumns = headersWithRefs.map(({ ref }, index) => {
        if (index === activeKey && ref.current) {
          const width = event.clientX - ref.current.offsetLeft;

          if (width > minCellWidth) {
            return `${width}px`;
          }
        }

        return `${minCellWidth}px`;
      });

      if (tableRef.current) {
        tableRef.current.style.gridTemplateColumns = `${gridColumns.join(" ")}`;
      }
    },
    [activeKey, headersWithRefs, minCellWidth]
  );

  useEffect(() => {
    if (activeKey !== null) {
      window.addEventListener("mouseup", endResize);
      window.addEventListener("mousemove", mouseMove);
    }

    return () => {
      window.removeEventListener("mouseup", endResize);
      window.removeEventListener("mousemove", mouseMove);
    };
  }, [activeKey, mouseMove]);

  return { tableRef, headersWithRefs, startResize, activeKey };
};
