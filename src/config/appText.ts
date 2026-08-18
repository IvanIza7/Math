/**
 * ============================================================================
 * ARCHIVO CENTRAL DE TEXTOS Y CONFIGURACIÓN
 * ============================================================================
 * Re-exporta el diccionario central definido en /src/i18n.ts
 */

import { i18n, APP_TEXTS, t, I18nType } from '../i18n';

export { i18n, APP_TEXTS, t };
export type { I18nType, I18nType as AppTextsType };
export default i18n;
