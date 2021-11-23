import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { SpaceList } from "./SpaceList/SpaceList";
import { generateSpaceData } from "./utils";

const { allList, pinnedList, hiddenList } = generateSpaceData(10001);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <SpaceList allList={allList} pinnedList={pinnedList} hiddenList={hiddenList} />
  </StrictMode>,
  rootElement
);
