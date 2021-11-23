import { ListRowProps } from "react-virtualized";

export interface Space {
  id: string;
  name: string;
  creator: string;
}

export interface CustomItem {
  renderMethod: (props: ListRowProps) => React.ReactNode;
}

export interface RenderItem {
  spaces?: Space[];
  customItem?: CustomItem;
}

export interface SpaceGridCardProps {
  space: Space;
  style?: React.CSSProperties;
}

export interface SpaceTableCellProps {
  space: Space;
  style?: React.CSSProperties;
}
