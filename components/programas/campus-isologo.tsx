/**
 * Isologo del Campus Educativo (los cuadraditos con la "C"), el mismo SVG
 * que usa el Campus junto a "Acceso al aula" en Modo Secundaria. Decorativo:
 * el texto de la fila ya dice adónde lleva.
 */
export function CampusIsologo({ className }: { className?: string }) {
  const violeta = "#6a5083";
  const celeste = "#1fa3bd";
  const azul = "#0899bf";
  return (
    <svg viewBox="0 0 360 576" className={className} aria-hidden="true" focusable="false">
      <rect x="72" y="72" width="72" height="72" fill={violeta} opacity=".8" />
      <rect x="144" y="72" width="72" height="72" fill={celeste} />
      <rect x="216" y="72" width="72" height="72" fill={celeste} opacity=".4" />
      <rect x="216" y="360" width="72" height="72" fill={azul} opacity=".4" />
      <rect y="144" width="72" height="72" fill={violeta} />
      <rect x="288" y="144" width="72" height="72" fill={violeta} opacity=".8" />
      <rect y="216" width="72" height="72" fill={azul} />
      <rect x="144" y="216" width="72" height="72" fill={violeta} />
      <rect y="288" width="72" height="72" fill={azul} opacity=".5" />
      <rect x="144" y="360" width="72" height="72" fill={violeta} />
      <rect y="360" width="72" height="72" fill={celeste} />
      <rect x="288" y="216" width="72" height="72" fill={azul} />
      <rect x="288" y="288" width="72" height="72" fill={celeste} opacity=".4" />
      <rect x="288" width="72" height="72" fill={celeste} opacity=".2" />
      <rect x="72" y="432" width="72" height="72" fill={azul} />
      <rect x="216" y="288" width="72" height="72" fill={azul} />
      <rect y="504" width="72" height="72" fill={celeste} opacity=".2" />
      <rect x="144" y="432" width="72" height="72" fill={celeste} opacity=".2" />
      <path d="M216,144H72v288h72v-72h72l72-72v-144h-72ZM216,288h-72v-72h72v72Z" fill="#fff" />
    </svg>
  );
}
