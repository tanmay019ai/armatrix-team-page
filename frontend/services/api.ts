import axios from "axios";


export type TeamMember = {
  id: number;
  name: string;
  role: string;
  department: string;
  bio: string;
  photo_url: string;
  linkedin: string;
};


const apiClient = axios.create({
  baseURL: "/api",
  timeout: 10000,
});


export async function getTeamMembers(): Promise<TeamMember[]> {
  const response = await apiClient.get<TeamMember[]>("/team");
  return response.data;
}