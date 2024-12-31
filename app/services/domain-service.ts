export const checkDomainAvailability = async (domain: string) => {
  try {
    const response = await fetch(`/api/check-domain?domain=${domain}`);
    if (!response.ok) {
      throw new Error('Erreur lors de la vérification du domaine');
    }
    const data = await response.json();
    return data.available;
  } catch (error) {
    console.error('Erreur:', error);
    return false;
  }
}; 