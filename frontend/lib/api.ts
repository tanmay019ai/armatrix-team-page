import axios from "axios";


export type TeamMember = {
  id: number;
  name: string;
  role: string;
  department: string;
};


const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000",
});


export async function getTeamMembers(): Promise<TeamMember[]> {
  const response = await apiClient.get<TeamMember[]>("/team");
  return response.data;
}