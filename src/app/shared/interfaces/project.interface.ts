export interface Project {
  _id: string,
  createdAt: string,
  updatedAt: string,
  name: string,
  tasks?: any[],
  workers: string[]
}
