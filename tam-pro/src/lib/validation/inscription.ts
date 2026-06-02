import { z } from 'zod'

/**
 * Schéma minimal d'inscription pro (V1).
 * Champs alignés sur la spec validée : 6 champs obligatoires.
 */
export const inscriptionSchema = z
  .object({
    societe: z.string().min(2, 'La raison sociale est requise (min 2 caractères)').max(120),
    nom_contact: z.string().min(2, 'Le nom du contact est requis').max(80),
    email: z.string().email('Email invalide').max(120),
    telephone: z
      .string()
      .min(8, 'Téléphone invalide')
      .max(20)
      .regex(/^[+0-9\s().-]+$/, 'Format de téléphone invalide'),
    pays: z.string().min(2, 'Pays requis'),
    mot_de_passe: z
      .string()
      .min(10, 'Le mot de passe doit comporter au moins 10 caractères')
      .regex(/[A-Z]/, 'Au moins une majuscule requise')
      .regex(/[0-9]/, 'Au moins un chiffre requis')
      .regex(/[^A-Za-z0-9]/, 'Au moins un caractère spécial requis'),
    confirmation: z.string(),
    type: z.enum(['chr', 'export']),
    cgv_accepte: z.literal(true, {
      errorMap: () => ({ message: 'Vous devez accepter les CGV' }),
    }),
    rgpd_accepte: z.literal(true, {
      errorMap: () => ({ message: 'Vous devez accepter la politique RGPD' }),
    }),
  })
  .refine((d) => d.mot_de_passe === d.confirmation, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmation'],
  })

export type InscriptionInput = z.infer<typeof inscriptionSchema>
