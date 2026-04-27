import { Gutter } from "@payloadcms/ui"

/**
 * Custom Payload admin view rendered at /admin/documentacao.
 * Server component — content is plain HTML/JSX.
 */
export default function DocsView() {
  return (
    <div style={{ minHeight: "100vh", paddingTop: 32, paddingBottom: 64 }}>
      <Gutter>
        <header style={{ marginBottom: 32 }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "var(--theme-elevation-500)",
              margin: 0,
            }}
          >
            Manual do Administrador
          </p>
          <h1 style={{ fontSize: 32, margin: "8px 0 0 0", color: "var(--theme-text)" }}>
            Documentação
          </h1>
          <p
            style={{
              fontSize: 15,
              color: "var(--theme-elevation-700)",
              maxWidth: 640,
              marginTop: 12,
            }}
          >
            Guia rápido para gerir o site Kriativa. Cobre conteúdo, traduções,
            questionários e operação.
          </p>
        </header>

        <Section title="Como editar conteúdo">
          <p>
            No menu lateral, cada secção corresponde a uma área do site:
          </p>
          <ul>
            <li>
              <strong>Serviços</strong> — As 3 linhas que aparecem em <code>/servicos</code>:
              Desenvolvimento, Infra & Cloud, Comércio.
            </li>
            <li>
              <strong>Portefólio</strong> — Projectos visíveis em <code>/portfolio</code>.
              Confidenciais ficam ocultos pelo nome mas são listados.
            </li>
            <li>
              <strong>Blog</strong> — Artigos em <code>/blog</code>. Conteúdo aceita Markdown.
            </li>
            <li>
              <strong>Testemunhos</strong> — Citações que aparecem na home e em outras páginas.
            </li>
            <li>
              <strong>Media</strong> — Biblioteca central de imagens. Usado por capas de
              Portefólio, Blog e avatares de Testemunhos.
            </li>
          </ul>
          <p>
            Para editar, clique no item, altere os campos e <strong>Save</strong>.
            As alterações ficam imediatamente visíveis no site (sem necessidade de rebuild).
          </p>
        </Section>

        <Section title="Traduções (PT / EN / FR)">
          <p>
            Quase todos os campos de conteúdo são <strong>localizados</strong>. No canto
            superior direito de cada formulário existe um seletor de <strong>Locale</strong>:
          </p>
          <ol>
            <li>Edite o campo na língua actual.</li>
            <li>Mude para outra língua usando o seletor.</li>
            <li>Edite a versão traduzida.</li>
            <li><strong>Save</strong> em qualquer um — guarda todas as línguas.</li>
          </ol>
          <p>
            Se uma tradução estiver em branco, o site mostra a versão portuguesa
            como fallback.
          </p>
        </Section>

        <Section title="Questionários (briefings de cliente)">
          <p>Workflow para enviar um questionário a um cliente:</p>
          <ol>
            <li>
              Vá a <strong>Modelos de Questionários</strong> e confirme que existe um
              modelo activo (ex. "Briefing Inicial").
            </li>
            <li>
              Vá a <strong>Convites de Questionário</strong> →{" "}
              <strong>Create New</strong>.
            </li>
            <li>
              Preencha:
              <ul>
                <li>
                  <strong>Template</strong> — qual modelo usar
                </li>
                <li>
                  <strong>Locale</strong> — em que língua o questionário aparece
                </li>
                <li>
                  <strong>Client Name + Client Email</strong> — quem é o cliente
                </li>
                <li>
                  <strong>Expires At</strong> (opcional) — depois desta data o link
                  deixa de funcionar
                </li>
              </ul>
            </li>
            <li>
              <strong>Save</strong>. O sistema:
              <ul>
                <li>Gera um token único e a URL pública (na sidebar do convite)</li>
                <li>Envia automaticamente um email ao cliente com o link</li>
              </ul>
            </li>
            <li>
              Quando o cliente submete, vai para <strong>Respostas de Questionários</strong>{" "}
              e recebe email de notificação na conta <code>geral@kriativa.ao</code>.
            </li>
          </ol>
          <p>
            <strong>Re-envio</strong>: para enviar novamente, edite o convite e clique em{" "}
            <strong>Save</strong> — o email só é enviado na <em>criação</em>; para re-enviar,
            terá de copiar manualmente a URL Pública e enviar por email/WhatsApp.
          </p>
        </Section>

        <Section title="Imagens e Media">
          <p>
            Quando carrega uma imagem em qualquer formulário (capa de projecto, capa de
            blog, avatar de testemunho), o ficheiro fica armazenado na collection{" "}
            <strong>Media</strong>. Pode reutilizá-lo noutros formulários.
          </p>
          <p>
            <strong>Tamanhos automáticos:</strong> cada upload gera versões{" "}
            <code>thumbnail</code> (400×300), <code>card</code> (768×1024) e{" "}
            <code>wide</code> (1920px) — o site escolhe a versão certa por contexto.
          </p>
          <p style={{ padding: 12, background: "var(--theme-warning-50, #fff7e6)", borderLeft: "3px solid var(--theme-warning-500, #ff9800)", marginTop: 16 }}>
            <strong>⚠️ Limitação na Vercel</strong>: por defeito, os uploads ficam no
            sistema de ficheiros da função serverless, que é{" "}
            <strong>efémero</strong> — os ficheiros podem desaparecer entre pedidos. Para
            armazenamento persistente, é necessário configurar <strong>Vercel Blob</strong>{" "}
            ou outro storage externo. Fale com o programador se planear usar imagens
            extensivamente.
          </p>
        </Section>

        <Section title="Tema (Light / Dark mode)">
          <p>
            O Payload já tem um seletor de tema <strong>incorporado</strong>. Procure no
            <strong> menu do utilizador</strong> (canto inferior esquerdo, com o seu email)
            → opção <strong>Theme</strong> ou <strong>Tema</strong>. Pode escolher:
          </p>
          <ul>
            <li>
              <strong>Auto</strong> — segue a preferência do sistema operativo
            </li>
            <li>
              <strong>Light</strong> — sempre claro
            </li>
            <li>
              <strong>Dark</strong> — sempre escuro
            </li>
          </ul>
        </Section>

        <Section title="Cuidado com as línguas no admin">
          <p>
            Antes de editar, <strong>confirme em que locale está</strong> (canto superior
            direito). Se editar achando que está em PT mas estiver em EN, vai sobrescrever
            o conteúdo inglês.
          </p>
        </Section>

        <Section title="Backup e segurança">
          <ul>
            <li>
              Toda a informação fica na base de dados <strong>Supabase</strong> — incluindo
              utilizadores, conteúdo, respostas de questionários.
            </li>
            <li>
              Para backup: Supabase oferece backups automáticos no plano pago. No plano
              gratuito, faça <code>pg_dump</code> manualmente quando necessário.
            </li>
            <li>
              Não partilhe credenciais (`.env.local`, password do admin) por canais
              inseguros (WhatsApp, email).
            </li>
          </ul>
        </Section>

        <Section title="Suporte técnico">
          <p>
            Repositório do projecto:{" "}
            <a
              href="https://github.com/josecarloscabenda/kriativa-website"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/josecarloscabenda/kriativa-website
            </a>
          </p>
          <p>
            Para erros de email/dns/DB, contactar o programador.
          </p>
        </Section>
      </Gutter>

      <style>{`
        h2 { font-size: 20px; color: var(--theme-text); margin: 0 0 12px 0; }
        h3 { font-size: 16px; color: var(--theme-text); margin: 24px 0 8px 0; }
        p, li { font-size: 14px; line-height: 1.65; color: var(--theme-elevation-700); }
        ul, ol { padding-left: 22px; margin: 8px 0; }
        ul li, ol li { margin-bottom: 6px; }
        code { background: var(--theme-elevation-100); padding: 2px 6px; border-radius: 3px; font-size: 13px; color: var(--theme-text); }
        a { color: var(--theme-success-600, #0070f3); text-decoration: none; }
        a:hover { text-decoration: underline; }
        strong { color: var(--theme-text); }
      `}</style>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section
      style={{
        padding: "24px 0",
        borderTop: "1px solid var(--theme-elevation-100)",
        maxWidth: 720,
      }}
    >
      <h2>{title}</h2>
      {children}
    </section>
  )
}
