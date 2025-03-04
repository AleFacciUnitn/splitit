import { VariableSizeList } from "react-window";

export default function List({items, height, Row}) {
  const rowSizes = new Array(items?.length)
    .fill(true)
    .map(() => 25 + Math.round(Math.random() * 50))

  return (
    <VariableSizeList
      itemCount={items?.length}
      height={height}
      itemSize={index => rowSizes[index] + 32}>
      {Row}
    </VariableSizeList>
  );
}
