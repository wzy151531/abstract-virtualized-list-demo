import React, { useCallback, useMemo } from 'react';
import { AutoSizer, ColumnSizer, Grid, GridCellProps } from 'react-virtualized';
import { SpaceGridCard } from '../../Space/SpaceGridCard';
import { SpaceListProps } from '../interface';

export const SpaceGridListColumnSizer = (props: SpaceListProps) => {
  const { allList } = props;
  const dataCount = allList.length;

  const columnCount = 10;

  const rowCount = useMemo(
    () => {
      return dataCount / columnCount;
    },
    [columnCount, dataCount],
  )

  const cellRenderer = useCallback(
    (props: GridCellProps) => {
      const { columnIndex, rowIndex, style } = props;
      const index = rowIndex * columnCount + columnIndex;

      if (index >= dataCount) {
        return null;
      }

      const space = allList[index];

      return (
        <SpaceGridCard
          space={space}
          style={style}
        />
      )
    },
    [allList, dataCount, columnCount]
  )

  return (
    <AutoSizer>
      {({ width, height }) => (
        <ColumnSizer
          columnMaxWidth={400}
          columnMinWidth={200}
          columnCount={columnCount}
          key="GridColumnSizer"
          width={width}
        >
          {({ adjustedWidth, columnWidth, registerChild }) => (
            <div
              style={{
                height,
                width: adjustedWidth,
              }}
            >
              <Grid
                ref={registerChild}
                columnWidth={columnWidth}
                columnCount={columnCount}
                height={height}
                cellRenderer={cellRenderer}
                rowHeight={86}
                rowCount={rowCount + (dataCount % columnCount === 0 ? 0 : 1)}
                width={adjustedWidth}
              />
            </div>
          )}
        </ColumnSizer>
      )}
    </AutoSizer>
  );
};
