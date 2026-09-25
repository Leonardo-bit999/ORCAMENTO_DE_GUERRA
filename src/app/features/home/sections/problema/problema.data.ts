export interface DadoRealidade {
  id: string;
  title: string;
  description: string;
  text: string;
  source: string;
  link: string;
  image: string;
  alt: string;
}

export const DADOS_REALIDADE: DadoRealidade[] = [
  {
    id: 'inadimplencia',
    title: '80,6 milhões',
    description: 'de brasileiros terminaram o ano de 2025 inadimplentes',
    text: 'O país fechou o ano com recorde de pessoas com o nome negativado, segundo o Mapa da Inadimplência e Negociação de Dívidas.',
    source: 'Serasa Experian - Dezembro de 2025',
    link: 'https://www.serasa.com.br/imprensa/inadimplencia-ultrapassa-806-milhoes-virada-ano-dividas-impedem-sonhos-serasa/',
    image: '/images/dado-inadimplencia.png',
    alt: 'Contas e faturas em atraso espalhadas sobre a mesa de uma casa simples',
  },
  {
    id: 'familias',
    title: '78,9%',
    description: 'das famílias brasileiras estavam endividadas',
    text: 'Quase 8 em cada 10 famílias encerraram 2025 com algum tipo de dívida a vencer — o maior nível já registrado para um mês de dezembro.',
    source:
      'CNC - Pesquisa de Endividamento e Inadimplência do Consumidor (Peic) - Dezembro de 2025',
    link: 'https://pesquisascnc.com.br/pesquisa-peic/',
    image: '/images/dado-familias.png',
    alt: 'Mãos organizando comprovantes e moedas sobre uma mesa pequena em casa',
  },
  {
    id: 'dividas',
    title: 'R$ 518 bilhões',
    description: 'em dívidas atrasadas no país',
    text: 'O total de pendências equivale a cerca de metade da população adulta com contas em atraso, concentradas em bancos, cartões e contas básicas.',
    source: 'Serasa Experian - 2025',
    link: 'https://www.serasa.com.br/limpa-nome-online/blog/mapa-da-inadimplencia-e-renogociacao-de-dividas-no-brasil/',
    image: '/images/dado-cartao.png',
    alt: 'Mão segurando um cartão de crédito em frente a uma máquina de pagamento',
  },
  {
    id: 'reserva',
    title: 'Quase 1/3',
    description: 'dos brasileiros não têm nenhuma reserva financeira',
    text: 'E só 24% conseguiriam se sustentar por mais de seis meses com o que têm guardado. Sem colchão, qualquer imprevisto vira dívida.',
    source: 'Anbima/Datafolha - 2026',
    link: 'https://www.infomoney.com.br/onde-investir/quase-1-3-dos-brasileiros-nao-tem-nenhuma-reserva-financeira-diz-estudo-da-anbima/',
    image: '/images/dado-reserva.png',
    alt: 'Cofrinhos quase vazios com poucas moedas no parapeito de uma janela urbana',
  },
  {
    id: 'jovens',
    title: '+49%',
    description: 'de jovens de 18 a 25 anos renegociando dívidas',
    text: 'As negociações da Geração Z cresceram quase 50% entre janeiro e julho de 2025 — sinal de que a conta chega cedo.',
    source: 'Serasa Limpa Nome - 2025',
    link: 'https://www.serasa.com.br/imprensa/geracao-z-e-o-publico-que-mais-cresce-nas-negociacoes-de-dividas/',
    image: '/images/dado-jovens.png',
    alt: 'Jovem trabalhador de uniforme conferindo o celular em um ponto de ônibus à noite',
  },
];

export const DESTAQUE = DADOS_REALIDADE[0];
export const SECUNDARIOS = DADOS_REALIDADE.slice(1);
