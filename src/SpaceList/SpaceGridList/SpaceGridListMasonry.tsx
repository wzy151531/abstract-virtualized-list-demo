import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import {
  CellMeasurerCache,
  createMasonryCellPositioner,
  MasonryCellProps,
  CellMeasurer,
  AutoSizer,
  Masonry,
} from 'react-virtualized';
import { SpaceGridCard } from '../../Space/SpaceGridCard';
import { SpaceListProps } from '../interface';

const COLUMN_WIDTH = 100;
const GUTTER_SIZE = 10;

export const SpaceGridListMasonry = (props: SpaceListProps) => {
  const { allList } = props;

  const [width, setWidth] = useState<number>(0);

  const masonryRef = useRef<any>(null);

  const columnCount = useMemo(
    () => {
      return Math.floor(width / (COLUMN_WIDTH + GUTTER_SIZE));
    },
    [width]
  )

  const cellMeasurerCache = useMemo(
    () => new CellMeasurerCache({
      defaultHeight: 66,
      defaultWidth: COLUMN_WIDTH,
      fixedHeight: true,
      fixedWidth: true,
    }),
    []
  )

  const cellPositioner = useMemo(
    () => createMasonryCellPositioner({
      cellMeasurerCache,
      columnWidth: COLUMN_WIDTH,
      columnCount,
      spacer: GUTTER_SIZE,
    }),
    [cellMeasurerCache, columnCount]
  )

  const tableCellRenderer = useCallback(
    (props: MasonryCellProps) => {
      const { index, style, key, parent } = props;
      const space = allList[index];

      return (
        <CellMeasurer
          cache={cellMeasurerCache}
          index={index}
          key={key}
          parent={parent}
        >
          <SpaceGridCard
            space={space}
            style={style}
          />
        </CellMeasurer>
      )
    },
    [allList, cellMeasurerCache, width]
  )

  const handleResize = useCallback(
    ({width}) => {
      setWidth(width);
      cellPositioner.reset({
        columnCount,
        columnWidth: COLUMN_WIDTH,
        spacer: GUTTER_SIZE,
      })
      masonryRef.current.recomputeCellPositions();
    },
    [columnCount, cellPositioner],
  )

  return (
    <AutoSizer onResize={handleResize}>
      {({height, width}) => {
        setWidth(width);
        return (
          <Masonry
            ref={masonryRef}
            autoHeight={false}
            height={height}
            width={width}
            cellCount={allList.length}
            cellMeasurerCache={cellMeasurerCache}
            cellRenderer={tableCellRenderer}
            cellPositioner={cellPositioner}
          />
        )
      }}
    </AutoSizer>
  )
  
}