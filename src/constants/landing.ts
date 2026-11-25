export const WHATSAPP_NUMBER = '5547996474116';
export const INSTAGRAM_URL = 'https://www.instagram.com/cerimonialporexcelencia/';

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WhatsAppLinks = {
  general: buildWhatsAppUrl('Olá, Victoria! Quero conversar sobre meu evento.'),
  celebrations: buildWhatsAppUrl(
    'Olá, Victoria! Quero conversar sobre o cerimonial de uma celebração.',
  ),
  corporate: buildWhatsAppUrl(
    'Olá, Victoria! Quero conversar sobre o cerimonial de um evento corporativo.',
  ),
  availability: buildWhatsAppUrl(
    'Olá, Victoria! Meu evento será em outra cidade. Podemos consultar a disponibilidade?',
  ),
  lateWeddingPlanning: buildWhatsAppUrl(
    'Olá, Victoria! Meu casamento está próximo. Gostaria de consultar a disponibilidade para assessoria de reta final.',
  ),
};

export const navigationLinks = [
  { href: '#diagnostico', label: 'Diagnóstico' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#metodologia', label: 'Metodologia' },
  { href: '#victoria-klein', label: 'Victoria Klein' },
  { href: '#faq', label: 'Dúvidas' },
];

export const heroContent = {
  eyebrow: 'Da simplicidade ao extraordinário',
  location: 'Santa Catarina · Brasil',
  headline: {
    start: 'O casamento que você sonha, conduzido com ',
    emphasis: 'serenidade',
    end: ', precisão e afeto.',
  },
  subheadline:
    'Planejamento e cerimonial em Santa Catarina para quem valoriza organização minuciosa, alinhamento técnico e a tranquilidade de viver cada momento.',
  cta: 'Começar diagnóstico gratuito',
  image: '/cerimonial-reception-editorial.jpg',
};

export const diagnosticContent = {
  eyebrow: 'Diagnóstico inicial',
  title: 'Diagnóstico de Cerimonial & Planejamento',
  text: 'Entenda o perfil e a estimativa de custo do seu casamento com base no orçamento, no estilo e no número de convidados.',
  benefits: [
    'Avalie se o orçamento combina com o evento que você imagina.',
    'Organize as prioridades do casal e o número de convidados.',
    'Identifique os próximos passos do planejamento.',
  ],
  cta: 'Fazer meu diagnóstico gratuito',
};

export const services = [
  {
    title: 'Assessoria completa para casamentos',
    category: 'Formato principal',
    icon: 'diamond',
    description:
      'Planejamento personalizado e coordenação presencial, dos primeiros preparativos ao grande dia.',
    highlights: [
      'Organização das etapas e do orçamento',
      'Acompanhamento de fornecedores',
      'Visita técnica e cronograma',
      'Coordenação da cerimônia e da recepção',
    ],
    cta: 'Fazer diagnóstico do casamento',
    href: undefined,
  },
  {
    title: 'Celebrações e aniversários',
    category: 'Social & familiar',
    icon: 'celebration',
    subtitle: 'Aniversários, bodas e encontros comemorativos',
    description:
      'Aniversários, bodas e outras comemorações planejadas com cuidado para que você aproveite a companhia de quem convidou.',
    highlights: [
      'Planejamento da celebração',
      'Alinhamento de fornecedores',
      'Acolhimento aos convidados',
    ],
    cta: 'Conversar sobre uma celebração',
    href: WhatsAppLinks.celebrations,
  },
  {
    title: 'Eventos corporativos',
    category: 'Institucional & marcas',
    icon: 'business_center',
    subtitle: 'Encontros, convenções, premiações e lançamentos',
    description: 'Cerimonial para confraternizações, convenções, premiações e lançamentos.',
    highlights: [
      'Planejamento e cronograma',
      'Alinhamento de fornecedores',
      'Coordenação presencial do evento',
    ],
    cta: 'Conversar sobre evento corporativo',
    href: WhatsAppLinks.corporate,
  },
];

export const benefits = [
  {
    title: 'Presença antecipada',
    description:
      'A equipe chega 3 horas antes para conferir a montagem e alinhar os detalhes com os fornecedores.',
  },
  {
    title: 'Coordenação contínua de até 8h',
    description:
      'Acompanhamos fornecedores, equipe, convidados e cronograma ao longo da celebração.',
  },
  {
    title: 'Recepção bilíngue sob consulta',
    description: 'Recepcionistas bilíngues podem acolher e orientar convidados estrangeiros.',
  },
  {
    title: 'Tranquilidade para celebrar',
    description: 'Cuidamos dos bastidores e dos ajustes do dia para você aproveitar a celebração.',
  },
];

export const steps = [
  {
    title: 'A gente se conhece',
    label: 'Estilo e orçamento',
    description:
      'Em uma conversa on-line, entendemos seus planos, expectativas, estilo e orçamento.',
  },
  {
    title: 'Planejamos juntos',
    label: 'Etapas e fornecedores',
    description:
      'Você acompanha tarefas, prazos e fornecedores pelo WhatsApp e pelo aplicativo Assessoria VIP.',
  },
  {
    title: 'Visitamos o local',
    label: 'Avaliação técnica',
    description: 'Avaliamos o espaço, a estrutura e os pontos técnicos e logísticos do evento.',
  },
  {
    title: 'Alinhamos os detalhes',
    label: 'Cronograma do evento',
    description:
      'Perto da data, revisamos as informações com fornecedores e estruturamos o cronograma técnico.',
  },
  {
    title: 'Coordenamos o grande dia',
    label: 'Equipe no local',
    description:
      'A equipe chega 3 horas antes para conferir tudo e coordena o evento por até 8 horas.',
  },
];

export const trustContent = {
  title: 'Planejamento estruturado e presença atenta para o seu evento.',
  text: 'À frente do Cerimonial por Excelência, Victoria Klein planeja e coordena casamentos, celebrações e eventos corporativos.',
  detail:
    'Com base em Blumenau, Victoria e sua equipe acompanham as decisões, alinham os fornecedores e cuidam dos bastidores para você aproveitar o evento.',
  image: '/cerimonial-planning-details.jpg',
  imageAlt: 'Detalhes de papelaria e planejamento de uma celebração sobre uma mesa de madeira',
};

export const coverageRegions = [
  {
    title: 'Blumenau e Vale Europeu',
    icon: 'location_city',
    cities: 'Base em Blumenau e atendimento nas cidades vizinhas do Vale Europeu.',
  },
  {
    title: 'Litoral catarinense',
    icon: 'waves',
    cities: 'Balneário Camboriú, Itajaí, Porto Belo, Itapema e Bombinhas.',
  },
  {
    title: 'Florianópolis',
    icon: 'sunny',
    cities: 'Atendimento em Florianópolis para casamentos e celebrações.',
  },
  {
    title: 'Joinville e Região Norte',
    icon: 'apartment',
    cities: 'Joinville e Região Norte de Santa Catarina.',
  },
];

export const coverage = 'Seu evento será em outra cidade? Consulte a disponibilidade da equipe.';

export const faqs = [
  {
    question: 'Como funciona o primeiro passo?',
    answer:
      'Começamos com uma conversa on-line para entender seus planos, estilo, prioridades e orçamento.',
  },
  {
    question: 'Qual é o tempo de permanência da equipe no dia do evento?',
    answer:
      'A equipe chega 3 horas antes para conferir a montagem e coordena o evento por até 8 horas.',
  },
  {
    question: 'Vocês atendem apenas casamentos?',
    answer: 'Também atendemos aniversários, bodas, outras celebrações e eventos corporativos.',
  },
  {
    question: 'Como funciona o atendimento bilíngue?',
    answer:
      'A recepção bilíngue pode ser solicitada no planejamento para acolher e orientar convidados estrangeiros.',
  },
  {
    question: 'Atendem em quais cidades?',
    answer:
      'Atendemos Blumenau e Vale Europeu, litoral catarinense, Norte de Santa Catarina e Florianópolis. Outras cidades estão sujeitas à disponibilidade.',
  },
  {
    question: 'Qual canal devo usar para iniciar o contato?',
    answer:
      'Para casamentos, comece pelo diagnóstico gratuito. Para celebrações e eventos corporativos, fale com a Victoria pelo WhatsApp.',
    contact: true,
  },
];

export const finalCTAContent = {
  title: 'Prontos para planejar sua celebração com tranquilidade?',
  text: 'Comece pelo diagnóstico gratuito. Para aniversários, celebrações ou eventos corporativos, fale direto com a Victoria.',
  cta: 'Começar diagnóstico gratuito',
  secondaryCta: 'Conversar pelo WhatsApp',
};
