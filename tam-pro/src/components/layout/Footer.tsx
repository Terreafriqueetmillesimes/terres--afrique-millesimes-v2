export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto px-12 py-6 border-t border-or/20 text-center">
      <p className="font-sc text-[0.78rem] text-gris tracking-[0.18em]">
        © {year} Terres d'Afrique &amp; Millésimes — Groupe Queen Egome ·
        SIRET&nbsp;945&nbsp;025&nbsp;666&nbsp;00013
      </p>
      <p className="font-sc text-[0.66rem] text-[#7a766c] tracking-[0.16em] uppercase mt-2">
        L'abus d'alcool est dangereux pour la santé — à consommer avec modération
      </p>
    </footer>
  )
}
