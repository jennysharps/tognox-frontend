import pathsConfig from '../config/paths'

export function getPath(pathName, pathData = {}) {
  const { path: needlePath } = pathsConfig[pathName] || {}
  const { params, path } = Object.values(pathsConfig)
    .find(({ path: haystackPath }) => needlePath === haystackPath) || {}

  return Object.keys(pathData)
      .reduce((accumulatedPath, dataKey) => (
        accumulatedPath.replace(params[dataKey], pathData[dataKey])
      ), path)
}
