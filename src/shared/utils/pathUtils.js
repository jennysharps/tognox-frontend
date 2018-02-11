import pathsConfig from '../config/paths'

export function getPathConfig(pathName) {
  const { path: needlePath } = pathsConfig[pathName] || {}
  return Object.values(pathsConfig)
    .find(({ path: haystackPath }) => needlePath === haystackPath) || {}
}

export function getPath(pathName, pathData = {}) {
  const { params, path } = getPathConfig(pathName);

  return Object.keys(pathData)
      .reduce((accumulatedPath, dataKey) => (
        accumulatedPath.replace(params[dataKey], pathData[dataKey])
      ), path)
}
