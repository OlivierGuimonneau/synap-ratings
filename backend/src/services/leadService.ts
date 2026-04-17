import { getAirtableBase } from '../clients/airtableClient';
import { env } from '../config/env';
import { z } from 'zod';
import { leadSchema } from '../schemas/leadSchema';

export type LeadInput = z.infer<typeof leadSchema>;

export async function createLead(input: LeadInput) {
  const base = getAirtableBase();
  
  // Créer le record en Airtable avec les noms de colonnes du user
  const records = await base(env.airtableTableName).create([
    {
      fields: {
        'Prénom': input.firstName,
        'Nom': input.lastName,
        'Email': input.email,
        'Entreprise': input.company,
        'Téléphone': input.phone || '',
        'Source': 'Synap-Ratings - Audit',
      },
    },
  ]);

  return { id: records[0].id };
}


