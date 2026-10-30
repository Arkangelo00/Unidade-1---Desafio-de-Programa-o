export interface ConfiguracaoAcademica {
  readonly MEDIA_MINIMA_APROVACAO: number;
  readonly NOTA_MINIMA: number;
  readonly NOTA_MAXIMA: number;
}

export const CONFIG_ACADEMICA: ConfiguracaoAcademica = Object.freeze({
  MEDIA_MINIMA_APROVACAO: 7.0,
  NOTA_MINIMA: 0.0,
  NOTA_MAXIMA: 10.0,
});
