import { PackType, ProjectStatus } from "@/validations/template-schema";

interface TemplateData {
  // Métadonnées système
  domain: string;
  packType: PackType;
  status: ProjectStatus;

  // Pack BASIC
  tokenName?: string;
  tokenSymbol?: string;
  contractAddress?: string;
  blockchain?: string;
  launchDate?: string;
  imageUrl?: string;

  // Pack MEDIUM
  description?: string;
  telegram?: string;
  twitter?: string;
  dexscreener?: string;

  // Pack PREMIUM
  aiAgent?: Record<string, unknown>;
  aiPrompt?: string;
  aiEnabled: boolean;
  aiLanguages: string[];
}

export class TemplateService {
  static async createTemplate(templateData: TemplateData) {
    try {
      console.log('Début createTemplate avec:', templateData);
      const response = await fetch('/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(templateData),
      });
      console.log('Réponse reçue:', response.status);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de la création du template');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erreur inattendue lors de la création du template');
    }
  }

  static async getTemplate(domain: string) {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      const response = await fetch(`${baseUrl}/api/template?domain=${domain}`);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de la récupération du template');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erreur inattendue lors de la récupération du template');
    }
  }

  static async getLatestTemplates() {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      const response = await fetch(`${baseUrl}/api/templatess/latest`);
      console.log(response);
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erreur inattendue lors de la récupération des templates');
    }
  }
}