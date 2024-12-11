export const download = (fileName: string, href: string) => {
  const link = document.createElement('a');
  link.href = href;
  link.download = fileName;
  link.target = '_blank';
  link.click();
  link.remove();
};
export const downloadFile = (fileName: string, blobData: Blob): void => {
  if (!blobData || (blobData || {}).size <= 0) return;
  download(fileName, URL.createObjectURL(blobData));
};
