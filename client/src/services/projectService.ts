import api from './api';

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProjectData {
  title: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
}

export interface UpdateProjectData extends Partial<CreateProjectData> {}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  count?: number;
}

// Get all projects
export const getProjects = async (): Promise<ApiResponse<Project[]>> => {
  const response = await api.get('/projects');
  return response.data;
};

// Get a specific project by ID
export const getProjectById = async (id: number): Promise<ApiResponse<Project>> => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};

// Create a new project
export const createProject = async (projectData: CreateProjectData): Promise<ApiResponse<Project>> => {
  const response = await api.post('/projects', projectData);
  return response.data;
};

// Update a project
export const updateProject = async (id: number, projectData: UpdateProjectData): Promise<ApiResponse<Project>> => {
  const response = await api.put(`/projects/${id}`, projectData);
  return response.data;
};

// Delete a project
export const deleteProject = async (id: number): Promise<ApiResponse<Project>> => {
  const response = await api.delete(`/projects/${id}`);
  return response.data;
};
