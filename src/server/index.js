export const getFileContents = async (repository, fileName) => {
  const fileInfo = await fetch(
    `/.netlify/functions/code?repository=${repository}&file=${fileName}`
  ).then(response => response.json())
  console.log("file info:", fileInfo)
  return fileInfo
}

export const getRepositoryFiles = async repository => {
  const body = await fetch(
    `/.netlify/functions/dir?repository=${repository}`
  ).then(response => response.json())
  return body
}

export const getAvailableRepositories = async () => {
  const res = await fetch("/.netlify/functions/list_repos").then(response =>
    response.json()
  )
  return res
}

export const updateRepositoryStats = async (repository, fileName, stats) => {
  console.log("calling update")
  fetch(`/.netlify/functions/update_repo_stats?repository=${repository}&file=${fileName}`, {
    method: "POST",
    body: JSON.stringify(stats)
  })
}
