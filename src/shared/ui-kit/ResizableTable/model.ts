import {
  useMemo,
  createRef,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";

export const useResizableTable = ({
  minCellWidth,
}: {
  minCellWidth: number;
}) => {
  const columns = useMemo(
    () => [
      {
        header: "Продукт",
        contents: ["Банан", "Яблоко", "Груша", "Апельсин"],
        ref: createRef<HTMLTableCellElement>(),
      },
      {
        header: "ID заказа",
        contents: ["12345", "12345", "12345", "12345"],
        ref: createRef<HTMLTableCellElement>(),
      },
      {
        header: "Статус",
        contents: [
          "Готов к получению",
          "Готов к получению",
          "Готов к получению",
          "Готов к получению",
        ],
        ref: createRef<HTMLTableCellElement>(),
      },
    ],
    []
  );

  const tableRef = useRef<HTMLTableElement | null>(null);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const mouseDown = (index: number) => setActiveIndex(index);

  const mouseUp = () => setActiveIndex(null);

  const mouseMove = useCallback(
    (event: MouseEvent) => {
      const gridColumns = columns.map((column, index) => {
        if (index === activeIndex && column.ref.current) {
          const width = event.clientX - column.ref.current.offsetLeft;

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
    [activeIndex, columns, minCellWidth]
  );

  useEffect(() => {
    if (activeIndex !== null) {
      window.addEventListener("mouseup", mouseUp);
      window.addEventListener("mousemove", mouseMove);
    }

    return () => {
      window.removeEventListener("mouseup", mouseUp);
      window.removeEventListener("mousemove", mouseMove);
    };
  }, [activeIndex, mouseMove]);

  return { tableRef, columns, mouseDown, activeIndex };
};
