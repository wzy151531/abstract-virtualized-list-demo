import React, { useCallback, useState } from 'react';
import { SpaceListProps } from './interface';
import { SpaceGridListColumnSizer } from './SpaceGridList/SpaceGirdListColumnSizer';
import { SpaceTableList } from './SpaceTableList';
import './styles.css';

export const SpaceList = (props: SpaceListProps) => {
  const { allList = [], pinnedList = [], hiddenList = [] } = props;

  console.log(allList.length, pinnedList.length, hiddenList.length);

  const [mode, setMode] = useState<'table' | 'grid'>('table');

  const handleButtonClick = useCallback(() => {
    if (mode === 'table') {
      setMode('grid');
    } else {
      setMode('table');
    }
  }, [mode]);

  return (
    <div className="space-list-wrap">
      <button onClick={handleButtonClick} style={{ marginBottom: 12 }}>
        change mode
      </button>
      <div style={{ height: 'calc(100% - 35px)' }}>
        {mode === 'table' ? (
          <SpaceTableList 
            allList={allList}
            pinnedList={pinnedList}
            hiddenList={hiddenList}
          />
        ) : (
          <SpaceGridListColumnSizer
            allList={allList}
            pinnedList={pinnedList}
            hiddenList={hiddenList}
          />
        )}
      </div>
    </div>
  );
};
