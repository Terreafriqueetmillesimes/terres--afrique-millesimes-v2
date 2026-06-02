import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Hr,
} from '@react-email/components'

type Props = { raisonSociale: string; type: 'chr' | 'export' }

export function InscriptionRecue({ raisonSociale, type }: Props) {
  const typeLabel = type === 'chr' ? 'CHR France' : 'Export Afrique'

  return (
    <Html>
      <Head />
      <Preview>Votre demande d'inscription {typeLabel} a bien été reçue</Preview>
      <Body style={{ background: '#0A0908', fontFamily: 'Georgia, serif', color: '#e9e4d8', margin: 0, padding: '40px 0' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', background: '#16130e', padding: '40px', border: '1px solid rgba(201,168,76,0.2)' }}>
          <Section style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Text style={{ fontSize: '12px', letterSpacing: '0.4em', color: '#C9A84C', textTransform: 'uppercase', margin: '0 0 16px' }}>
              ✦ INSCRIPTION REÇUE ✦
            </Text>
            <Heading style={{ fontSize: '28px', color: '#ffffff', margin: '0' }}>
              Merci, <em style={{ color: '#F0D080', fontStyle: 'italic' }}>{raisonSociale}</em>
            </Heading>
          </Section>

          <Hr style={{ borderColor: 'rgba(201,168,76,0.2)' }} />

          <Section style={{ padding: '24px 0' }}>
            <Text style={{ fontSize: '16px', lineHeight: 1.7 }}>
              Votre demande d'inscription <strong>{typeLabel}</strong> a bien été reçue.
              Notre équipe vérifie vos informations sous <strong style={{ color: '#C9A84C' }}>48 heures
              ouvrées</strong>.
            </Text>
            <Text style={{ fontSize: '16px', lineHeight: 1.7 }}>
              Vous recevrez un nouvel e-mail dès que votre compte sera activé, accompagné du
              catalogue {typeLabel} et de vos identifiants d'accès.
            </Text>
          </Section>

          <Hr style={{ borderColor: 'rgba(201,168,76,0.2)' }} />

          <Text style={{ fontSize: '11px', color: '#9a958a', textAlign: 'center', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Terres d'Afrique &amp; Millésimes · Groupe Queen Egome
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default InscriptionRecue
