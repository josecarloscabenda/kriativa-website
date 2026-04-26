export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatar?: string
}

// Nota: Estes testemunhos são exemplos fictícios para demonstração.
export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ana M.",
    role: "Directora de Marketing",
    company: "Empresa Exemplo",
    content:
      "A Kriativa transformou completamente a nossa presença online. O novo website é moderno, rápido e os nossos clientes adoram. As vendas online aumentaram significativamente desde o lançamento.",
  },
  {
    id: "2",
    name: "Carlos T.",
    role: "CEO",
    company: "StartupAO",
    content:
      "Profissionais dedicados e competentes. A aplicação mobile que desenvolveram para nós superou todas as expectativas. O suporte pós-lançamento foi excelente.",
  },
  {
    id: "3",
    name: "Maria L.",
    role: "Fundadora",
    company: "Boutique Digital",
    content:
      "Desde o branding até ao website, a Kriativa cuidou de tudo. A identidade visual ficou fantástica e o site é exactamente o que precisávamos para o nosso negócio.",
  },
]
