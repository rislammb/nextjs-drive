export function truncateMiddleOfLongFileName(fileName: string) {
  const fileNameLength = fileName.length;

  if (fileNameLength < 31) {
    return fileName;
  } else {
    const extensionDelimiterIndex = fileName.lastIndexOf(".");
    const middleRemovedName = `${fileName.substring(0, 23)}...${fileName.substring(extensionDelimiterIndex - 3)}`;
    return middleRemovedName;
  }
}
