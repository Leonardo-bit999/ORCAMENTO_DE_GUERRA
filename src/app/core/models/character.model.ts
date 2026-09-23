/* =========================================================
   Tipos base
   ========================================================= */

export type PerfilId = 'iniciante' | 'planejador' | 'personalizado';

export type Moradia = 'familia' | 'sozinho' | 'divide' | 'republica';

export type FonteRenda = 'jovem-aprendiz' | 'estagiario' | 'formal' | 'variavel' | 'personalizado';

export type CustoVida = 'baixo' | 'medio' | 'alto';

export type Responsabilidade =
  | 'transporte'
  | 'alimentacao'
  | 'internet'
  | 'contas-casa'
  | 'aluguel'
  | 'saude'
  | 'ajuda-familia'
  | 'educacao'
  | 'veiculo';

export type Objetivo =
  | 'sair-casa'
  | 'reserva'
  | 'comprar'
  | 'evitar-dividas'
  | 'ajudar-familia'
  | 'projeto'
  | 'outro';

export type EstiloVida = 'economico' | 'equilibrado' | 'confortavel';

export type Vibe = 'social' | 'caseiro' | 'fitness' | 'geek' | 'criativo';

/* =========================================================
   Tabelas fixas
   ========================================================= */

export const RENDA_MENSAL_POR_FONTE: Record<FonteRenda, number> = {
  'jovem-aprendiz': 800,
  estagiario: 1290,
  formal: 2299,
  variavel: 1599,
  personalizado: 0,
};

export const VALORES_BASE_DESPESA: Record<Responsabilidade, number> = {
  transporte: 150,
  alimentacao: 300,
  internet: 80,
  'contas-casa': 120,
  aluguel: 700,
  saude: 100,
  'ajuda-familia': 200,
  educacao: 150,
  veiculo: 300,
};

export const MODIFICADOR_CUSTO_VIDA: Record<CustoVida, number> = {
  baixo: 0.85,
  medio: 1.0,
  alto: 1.2,
};

export const MODIFICADOR_MORADIA: Record<Moradia, number> = {
  familia: 0.7,
  sozinho: 1.0,
  divide: 0.7,
  republica: 0.8,
};

/* =========================================================
   Presets de perfil
   ========================================================= */

export interface PerfilPreset {
  id: PerfilId;
  titulo: string;
  frase: string;
  bullets: string[];
  saldoInicial: number;
  reservaInicial: number;
  objetivoSugerido: string;
}

export const PERFIS: PerfilPreset[] = [
  {
    id: 'iniciante',
    titulo: 'O Iniciante',
    frase: 'Todo mundo começa de algum lugar.',
    bullets: ['Primeiro planejamento', 'Sem dívidas iniciais', 'Sem reserva'],
    saldoInicial: 650,
    reservaInicial: 0,
    objetivoSugerido:
      'Aprender os fundamentos da organização financeira e construir os primeiros hábitos.',
  },
  {
    id: 'planejador',
    titulo: 'O Planejador',
    frase: 'Você prefere se preparar antes que o imprevisto aconteça.',
    bullets: ['Renda estável', 'Despesas controladas', 'Pequena reserva'],
    saldoInicial: 1050,
    reservaInicial: 600,
    objetivoSugerido:
      'Manter o equilíbrio financeiro enquanto constrói segurança para imprevistos.',
  },
  {
    id: 'personalizado',
    titulo: 'Personalizado',
    frase: 'Você define as condições da sua própria campanha.',
    bullets: ['Você escolhe saldo', 'Você escolhe reserva', 'Você define a renda'],
    saldoInicial: 0,
    reservaInicial: 0,
    objetivoSugerido: 'Definir o próprio caminho.',
  },
];

/* =========================================================
   Listas de opções (labels amigáveis)
   ========================================================= */

export const MORADIAS: { id: Moradia; label: string }[] = [
  { id: 'familia', label: 'Mora com a família' },
  { id: 'sozinho', label: 'Mora sozinho' },
  { id: 'divide', label: 'Divide a casa' },
  { id: 'republica', label: 'Mora em república' },
];

export const FONTES_RENDA: { id: FonteRenda; label: string; valor: number }[] = [
  {
    id: 'jovem-aprendiz',
    label: 'Jovem Aprendiz',
    valor: RENDA_MENSAL_POR_FONTE['jovem-aprendiz'],
  },
  { id: 'estagiario', label: 'Estagiário', valor: RENDA_MENSAL_POR_FONTE['estagiario'] },
  { id: 'formal', label: 'Trabalho formal', valor: RENDA_MENSAL_POR_FONTE['formal'] },
  { id: 'variavel', label: 'Renda variável', valor: RENDA_MENSAL_POR_FONTE['variavel'] },
  { id: 'personalizado', label: 'Personalizado', valor: 0 },
];

export const CUSTOS_VIDA: { id: CustoVida; label: string; descricao: string }[] = [
  { id: 'baixo', label: 'Baixo', descricao: 'Gastos enxutos' },
  { id: 'medio', label: 'Médio', descricao: 'Equilíbrio' },
  { id: 'alto', label: 'Alto', descricao: 'Muitos compromissos' },
];

export const RESPONSABILIDADES: { id: Responsabilidade; label: string }[] = [
  { id: 'transporte', label: 'Transporte' },
  { id: 'alimentacao', label: 'Alimentação' },
  { id: 'internet', label: 'Internet/telefone' },
  { id: 'contas-casa', label: 'Contas da casa' },
  { id: 'aluguel', label: 'Aluguel' },
  { id: 'saude', label: 'Saúde' },
  { id: 'ajuda-familia', label: 'Ajuda à família' },
  { id: 'educacao', label: 'Educação' },
  { id: 'veiculo', label: 'Veículo' },
];

export const OBJETIVOS: { id: Objetivo; label: string }[] = [
  { id: 'sair-casa', label: 'Sair da casa dos pais' },
  { id: 'reserva', label: 'Construir uma reserva' },
  { id: 'comprar', label: 'Comprar algo importante' },
  { id: 'evitar-dividas', label: 'Evitar dívidas' },
  { id: 'ajudar-familia', label: 'Ajudar a família' },
  { id: 'projeto', label: 'Começar um projeto' },
  { id: 'outro', label: 'Outro' },
];

export const ESTILOS_VIDA: { id: EstiloVida; label: string; descricao: string }[] = [
  {
    id: 'economico',
    label: 'Econômico',
    descricao: 'Prioriza o essencial e procura economizar.',
  },
  {
    id: 'equilibrado',
    label: 'Equilibrado',
    descricao: 'Aproveita o presente sem perder o controle.',
  },
  {
    id: 'confortavel',
    label: 'Confortável',
    descricao: 'Valoriza conforto e experiências.',
  },
];

export const VIBES: { id: Vibe; label: string; descricao: string }[] = [
  {
    id: 'social',
    label: 'Social',
    descricao: 'Gosta de sair, encontrar pessoas e viver experiências.',
  },
  { id: 'caseiro', label: 'Caseiro', descricao: 'Prefere ficar em casa, séries e conforto.' },
  { id: 'fitness', label: 'Fitness', descricao: 'Treino, alimentação e cuidados pessoais.' },
  { id: 'geek', label: 'Geek', descricao: 'Tecnologia, jogos e cultura digital.' },
  { id: 'criativo', label: 'Criativo', descricao: 'Arte, música e projetos pessoais.' },
];

/* =========================================================
   Draft e Character final
   ========================================================= */

export interface CharacterDraft {
  // Etapa 1
  nome: string;
  perfilId: PerfilId | null;

  // Etapa 2
  moradia: Moradia | null;
  fonteRenda: FonteRenda | null;
  usarRendaSugerida: boolean;
  rendaMensal: number | null;
  custoVida: CustoVida | null;
  responsabilidades: Responsabilidade[];

  // Personalizado (só quando perfilId === 'personalizado')
  personalizado: {
    rendaMensal: number | null;
    saldoInicial: number | null;
    reservaInicial: number | null;
  };

  // Etapa 3
  objetivo: Objetivo | null;
  objetivoOutroTexto: string;

  // Etapa 4
  estiloVida: EstiloVida | null;
  vibe: Vibe | null;
}

export interface Character extends Omit<CharacterDraft, 'personalizado'> {
  id: string;
  userId: string;
  criadoEm: string;
  saldoInicial: number;
  reservaInicial: number;
  despesasPrevistas: number;
  perfilTitulo: string;
  perfilFrase: string;
}

export const DRAFT_INICIAL: CharacterDraft = {
  nome: '',
  perfilId: null,

  moradia: null,
  fonteRenda: null,
  usarRendaSugerida: true,
  rendaMensal: null,
  custoVida: null,
  responsabilidades: [],

  personalizado: {
    rendaMensal: null,
    saldoInicial: null,
    reservaInicial: null,
  },

  objetivo: null,
  objetivoOutroTexto: '',

  estiloVida: null,
  vibe: null,
};
