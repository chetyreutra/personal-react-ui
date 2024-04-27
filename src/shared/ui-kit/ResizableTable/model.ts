import {
  useMemo,
  createRef,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";

type ShapeWithKey<GenericKey extends PropertyKey> = {
  readonly key: GenericKey;
};

type UseResizableTableParams<
  GenericKey extends PropertyKey,
  HeaderShape extends ShapeWithKey<GenericKey>
> = {
  readonly minCellWidth: number;
  readonly headers: HeaderShape[];
};

export const useResizableTable = <
  GenericKey extends PropertyKey,
  HeaderShape extends ShapeWithKey<GenericKey>
>({
  minCellWidth,
  headers,
}: UseResizableTableParams<GenericKey, HeaderShape>) => {
  const headersWithRefs = useMemo(
    () =>
      headers.map((header) => ({
        ...header,
        ref: createRef<HTMLTableCellElement>(),
      })),
    [headers]
  );

  const tableRef = useRef<HTMLTableElement | null>(null);

  const [activeKey, setActiveKey] = useState<HeaderShape["key"] | null>(null);

  const startResize = (index: HeaderShape["key"]) => setActiveKey(index);

  const endResize = () => setActiveKey(null);

  const mouseMove = useCallback(
    (event: MouseEvent) => {
      const gridColumns = headersWithRefs.map(({ key, ref }) => {
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

/* import {
  useMemo,
  createRef,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";

type ShapeWithKey<K> = {
  readonly key: K;
};

type UseResizableTableParams<GenericKey, T extends ShapeWithKey<GenericKey>> = {
  readonly minCellWidth: number;
  readonly headers: T[];
};

export const useResizableTable = <
  GenericKey,
  HeaderShape extends ShapeWithKey<GenericKey>
>({
  minCellWidth,
  headers,
}: UseResizableTableParams<GenericKey, HeaderShape>) => {
  const headersWithRefs = useMemo(
    () =>
      headers.map((header) => ({
        ...header,
        ref: createRef<HTMLTableCellElement>(),
      })),
    [headers]
  );

  const tableRef = useRef<HTMLTableElement | null>(null);

  const [activeKey, setActiveKey] = useState<HeaderShape["key"] | null>(null);

  const startResize = (index: HeaderShape["key"]) => setActiveKey(index);

  const endResize = () => setActiveKey(null);

  const mouseMove = useCallback(
    (event: MouseEvent) => {
      const gridColumns = headersWithRefs.map(({ key, ref }) => {
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
}; */
