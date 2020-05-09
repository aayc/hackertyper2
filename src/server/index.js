export const getFileContents = async (repository, fileName) => {
  const { src } = await fetch(
    `/.netlify/functions/code?repository=${repository}&file=${fileName}`
  ).then(response => response.json())
  return src
}

export const getRepositoryFiles = async repository => {
  const body = await fetch(
    `/.netlify/functions/dir?repository=${repository}`
  ).then(response => response.json())
  return body
}
