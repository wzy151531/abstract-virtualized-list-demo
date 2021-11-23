import { Space } from "./Space/interface";

export const generateSpaceData = (count: number): { allList: Space[], pinnedList: Space[], hiddenList: Space[] } => {
  const allList = [];

  const pinnedCount = count / 4;
  const hiddenCount = count / 4;

  for (let i = 0; i < count; i++) {
    const space: Space = {
      id: `${i}`,
      name: `space-${i}`,
      creator: `creator-${i}`
    };
    allList.push(space);
  }
  return {
    allList,
    pinnedList: allList.slice(0, 8),
    hiddenList: allList.slice(-9988),
  };
}

export const spaceData2RenderData = (data: Space[], columnCount: number): Array<Space[]> => {
  const result: Array<Space[]> = [];
  const dataCount = data.length;
  if (columnCount <= 0 || dataCount === 0) {
    return result;
  }
  const iterateCount = dataCount % columnCount === 0
    ? dataCount / columnCount
    : Math.floor((dataCount / columnCount) + 1);
  for (let i = 0; i < iterateCount; i++) {
    const temp = data.slice(i * columnCount, (i + 1) * columnCount);
    result.push(temp);
  }
  return result;
}

export const renderData2SpaceData = (renderData: Array<Space[]>): Space[] => {
  return renderData.reduce(
    (pre: Space[], cur: Space[]) => {
      return pre.concat(cur);
    },
    []
  )
}
