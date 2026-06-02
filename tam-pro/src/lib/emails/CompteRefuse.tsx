import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Hr,
} from '@react-email/components'

type Props = { raisonSociale: string; motif: string }

export function CompteRefuse({ raisonSociale, motif }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Suite à votre inscription Terres d'Afrique &amp; Millésimes</Preview>
      <Body style={{ background: '#0A0908', fontFamily: 'Georgia, serif', color: '#e9e4d8', margin: 0, padding: '40px 0' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', background: '#16130e', padding: '40px', border: '1px solid rgba(201,168,76,0.2)' }}>
          <Section style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Text style={{ fontSize: '12px', letterSpacing: '0.4em', color: '#C9A84C', textTransform: 'uppercase', margin: '0 0 16px' }}>
              Suite à votre inscription
            </Text>
            <Heading style={{ fontSize: '24px', color: '#ffffff', margin: '0' }}>{raisonSociale}</Heading>
          </Section>

          <Hr style={{ borderColor: 'rgba(201,168,76,0.2)' }} />

          <Section style={{ padding: '24px 0' }}>
            <Text style={{ fontSize: '15px', lineHeight: 1.7 }}>
              Nous vous remercions de l'intérêt porté à notre maison. Après examen de votre dossier,
              nous ne pouvons malheureusement pas activer votre accès à l'espace partenaire pour le
              motif suivant :
            </Text>
            <Text style={{
              fontSize: '14px',
              padding: '16px',
              background: 'rgba(255,255,255,0.04)',
              borderLeft: '3px solid #A52A3A',
              fontStyle: 'italic',
              color: '#cfc9bb',
            }}>
              « {motif} »
            </Text>
            <Text style={{ fontSize: '14px', color: '#bdb8ab', lineHeight: 1.6 }}>
              Vous pouvez à tout moment soumettre une nouvelle demande après avoir régularisé votre
              situation, ou nous contacter pour échanger.
            </Text>
          </Section>

          <Hr style={{ borderColor: 'rgba(201,168,76,0.2)' }} />

          <Text style={{ fontSize: '11px', color: '#9a958a', textAlign: 'center' }}>
            Terres d'Afrique &amp; Millésimes
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default CompteRefuse
