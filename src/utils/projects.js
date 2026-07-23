import visibleProjects from '../data/projects.json'
import hiddenProjects from '../data/hidden-projects.json'

export { visibleProjects, hiddenProjects }

export function getAllProjects() {
  return [...visibleProjects, ...hiddenProjects]
}

export function getListedProjects(showHiddenFiles) {
  return showHiddenFiles ? getAllProjects() : visibleProjects
}

export function findProject(name) {
  return getAllProjects().find((project) => project.name === name) ?? null
}

export function resolveProjectName(target, projectList) {
  const normalized = target.trim().toLowerCase().replace(/['"]/g, '')
  const exact = projectList.find((project) => project.name.toLowerCase() === normalized)
  if (exact) return exact.name

  const partial = projectList.find((project) => project.name.toLowerCase().includes(normalized))
  return partial?.name ?? null
}
