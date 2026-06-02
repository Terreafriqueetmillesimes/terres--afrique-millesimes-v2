import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Hr, Button,
} from '@react-email/components'

type Props = {
  raisonSociale: string
  type: 'chr' | 'export'
  loginUrl: string
}

export function CompteValide({ raisonSociale, type, loginUrl }: Props) {
  const typeLabel = type === 'chr' ? 'CHR France' : 'Export Afrique'
  const accentColor = type === 'chr' ? '#A52A3A' : '#C28B55'

  return (
    <Html>
      <Head />
      <Preview>Votre compte {typeLabel} est validé — bienvenue chez Terres d'Afrique &amp; Millésimes</Preview>
      <Body style={{ background: '#0A0908', fontFamily: 'Georgia, serif', color: '#e9e4d8', margin: 0, padding: '40px 0' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', background: '#16130e', padding: '40px', border: '1px solid rgba(201,168,76,0.2)' }}>
          <Section style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Text style={{ fontSize: '12px', letterSpacing: '0.4em', color: '#C9A84C', textTransform: 'uppercase', margin: '0 0 16px' }}>
              ✦ TERRES D'AFRIQUE & MILLÉSIMES ✦
            </Text>
            <Heading style={{ fontSize: '32px', color: '#ffffff', fontStyle: 'italic', margin: '0' }}>
              Bienvenue, <span style={{ color: '#F0D080' }}>{raisonSociale}</span>
            </Heading>
          </Section>

          <Hr style={{ borderColor: 'rgba(201,168,76,0.2)' }} />

          <Section style={{ padding: '24px 0' }}>
            <Text style={{ fontSize: '16px', lineHeight: 1.7 }}>
              Bonne nouvelle : votre compte <strong style={{ color: accentColor }}>{typeLabel}</strong>{' '}
              a été validé par notre équipe. Vous pouvez désormais accéder à votre espace partenaire.
            </Text>
          </Section>

          <Section style={{ textAlign: 'center', padding: '16px 0 32px' }}>
            <Button
              href={loginUrl}
              style={{
                background: accentColor,
                color: '#ffffff',
                padding: '14px 32px',
                fontFamily: 'Georgia, serif',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                fontSize: '14px',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Accéder à mon espace
            </Button>
          </Section>

          <Section>
            <Text style={{ fontSize: '14px', color: '#bdb8ab', lineHeight: 1.6 }}>
              📕 <strong>Catalogue {typeLabel} en pièce jointe</strong> — version 2026-Q2,
              prix {type === 'chr' ? 'HT' : 'EXW départ cave'}.
            </Text>
            <Text style={{ fontSize: '14px', color: '#bdb8ab', lineHeight: 1.6 }}>
              Vous pouvez dès maintenant : télécharger le catalogue, soumettre une demande de devis,
              demander un rendez-vous commercial, consulter votre historique.
            </Text>
          </Section>

          <Hr style={{ borderColor: 'rgba(201,168,76,0.2)', marginTop: '32px' }} />

          <Text style={{ fontSize: '11px', color: '#9a958a', textAlign: 'center', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Terres d'Afrique &amp; Millésimes · Groupe Queen Egome · SIRET 945 025 666 00013
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default CompteValide
