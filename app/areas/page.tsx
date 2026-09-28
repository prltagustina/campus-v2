import { AreasQuickPicker } from "@/components/v3/areas-quick-picker";
import { AreaDetailContent } from "@/app/area/[slug]/area-detail-content";

/**
 * Sin portada, y el comportamiento de entrada difiere por dispositivo:
 *
 * - Mobile (tab bar inferior, sin aside): solo la botonera de áreas —
 *   Marco General incluido como primera opción, sin abrirse solo. Elegís
 *   y ahí navega al contenido correspondiente.
 * - Desktop/tablet (aside siempre visible para elegir otra área): entra
 *   directo al contenido de Marco General, como si hubieras ido a
 *   /area/marco-general.
 *
 * Ambas ramas quedan siempre en el DOM (una y otra oculta por CSS, no por
 * JS) para no depender de detección de dispositivo en el cliente — mismo
 * criterio que el resto del shell (ver app-shell.tsx).
 */
export default function AreasLandingPage() {
  return (
    <>
      <div className="md:hidden">
        <AreasQuickPicker hideLabel />
      </div>
      <div className="hidden md:block">
        <AreaDetailContent isMarcoGeneral />
      </div>
    </>
  );
}
