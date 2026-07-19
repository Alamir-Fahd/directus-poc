import { createDirectus, rest, readItems } from '@directus/sdk';

const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://127.0.0.1:8055';


export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string; 
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  avatar: string; 
}

export interface Partner {
  id: number;
  name: string;
  website_url: string;
  logo: string; 
}

interface Schema {
  services: Service[];
  team_members: TeamMember[];
  partners: Partner[];
}

export const client = createDirectus<Schema>(directusUrl).with(rest());