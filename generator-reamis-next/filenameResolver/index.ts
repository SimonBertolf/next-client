module.exports = {
  // @ts-ignore
  resolveFilename(path) {
    const lastIndex = path.lastIndexOf('/') > -1 ? path.lastIndexOf('/') : path.lastIndexOf('\\');
    let filename = '';
    if (lastIndex > -1) {
      filename = path.substring(lastIndex + 1, path.length);
    } else {
      filename = path;
    }
    return filename;
  }
};
