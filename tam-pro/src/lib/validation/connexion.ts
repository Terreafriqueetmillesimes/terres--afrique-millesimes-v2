import { z } from 'zod'

export const connexionSchema = z.object({
  email: z.string().email('Email invalide'),
  mot_de_passe: z.string().min(1, 'Mot de passe requis'),
  se_souvenir: z.boolean().optional(),
})

export type ConnexionInput = z.infer<typeof connexionSchema>
