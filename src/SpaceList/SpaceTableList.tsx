import React, { useCallback, useMemo } from 'react';
import { AutoSizer, ListRowProps, List } from 'react-virtualized';
import { RenderItem, Space } from '../Space/interface';
import { SpaceTableCell } from '../Space/SpaceTableCell';
import { spaceData2RenderData } from '../utils';
import { SpaceListProps } from './interface';

const PinnedListHeaderItem: RenderItem = {
  customItem: {
    renderMethod: (props: ListRowProps) => {
      const { style, key } = props;

      return (
        <div key={key} style={style}>
          Pinned
        </div>
      );
    },
  }
};

const OtherListHeaderItem: RenderItem = {
  customItem: {
    renderMethod: (props: ListRowProps) => {
      const { style, key } = props;

      return (
        <div key={key} style={style}>
          Other
        </div>
      );
    },
  }
};

const HiddenListHeaderItem: RenderItem = {
  customItem: {
    renderMethod: (props: ListRowProps) => {
      const { style, key } = props;

      return (
        <div key={key} style={style}>
          Hidden
        </div>
      );
    },
  }
};

export const SpaceTableList = (props: SpaceListProps) => {
  const { allList, pinnedList, hiddenList } = props;

  const columnCount = 10;

  const otherList = useMemo(
    () => {
      const pinnedListId = pinnedList.map(({id}) => id);
      const hiddenListId = hiddenList.map(({id}) => id);

      return allList.filter(({ id }) =>
        !pinnedListId.includes(id) && !hiddenListId.includes(id));
    },
    [
      allList,
      pinnedList,
      hiddenList,
    ],
  );

  const formattedPinnedList: RenderItem[] = useMemo(
    () => spaceData2RenderData(pinnedList, columnCount)
      .map((item) => ({ spaces: item })),
    [pinnedList, columnCount],
  );
  const formattedOtherList: RenderItem[] = useMemo(
    () => spaceData2RenderData(otherList, columnCount)
      .map((item) => ({ spaces: item })),
    [otherList, columnCount],
  )
  const formattedHiddenList: RenderItem[] = useMemo(
    () => spaceData2RenderData(hiddenList, columnCount)
      .map((item) => ({ spaces: item })),
    [hiddenList, columnCount],
  )

  const renderData: RenderItem[] = useMemo(
    () => [PinnedListHeaderItem]
      .concat(formattedPinnedList)
      .concat(OtherListHeaderItem)
      .concat(formattedOtherList)
      .concat(HiddenListHeaderItem)
      .concat(formattedHiddenList),
    [
      formattedPinnedList,
      formattedOtherList,
      formattedHiddenList,
    ]
  )

  const listRowRenderer = useCallback(
    (props: ListRowProps) => {
      const { index, style, key } = props;
      const renderItem: RenderItem = renderData[index];

      if (renderItem.customItem?.renderMethod) {
        return renderItem.customItem.renderMethod(props);
      }

      const customStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
      };

      const spaceTableCellStyle: React.CSSProperties = {
        flexGrow: 0,
        flexShrink: 0,
        width: '200px',
        margin: 10,
      }

      return (
        <div key={key} style={{ ...style, ...customStyle }}>
          {renderItem.spaces?.map((item: Space) => {
            return <SpaceTableCell space={item} style={spaceTableCellStyle} />;
          })}
        </div>
      );
    },
    [renderData],
  );

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          height={height}
          width={width}
          rowHeight={40}
          rowRenderer={listRowRenderer}
          rowCount={renderData.length}
          overscanRowCount={2}
        />
      )}
    </AutoSizer>
  );
};
