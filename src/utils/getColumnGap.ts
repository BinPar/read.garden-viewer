const getColumnGap = (
  availableWidth: number,
  maxWidth: number,
  minWidth: number,
  desiredColumnGap: number,
): number => {
  let columnGap = desiredColumnGap;
  if (availableWidth > maxWidth) {
    const gapCompensation = Math.max(availableWidth - desiredColumnGap - maxWidth, 0);
    columnGap += gapCompensation;
  } else if (availableWidth < minWidth + desiredColumnGap) {
    const gapCompensation = Math.min(availableWidth - minWidth - desiredColumnGap, 0);
    columnGap += gapCompensation;
  }

  return columnGap;
};

export default getColumnGap;
