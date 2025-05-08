import { NextResponse } from "next/server"
import { Resend } from "resend"

// Inicializar o Resend com sua chave API
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const data = await request.json()
    console.log("Dados recebidos:", JSON.stringify(data, null, 2))

    // Validação dos campos obrigatórios
    const requiredFields = ["name", "email", "phone"]
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    // Função para formatar os dados do briefing de forma mais robusta
    const formatBriefingData = (data: any) => {
      let html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #4f46e5; margin-top: 20px;">Informações de Contato</h2>
          <p><strong>Nome:</strong> ${data.name || "Não informado"}</p>
          <p><strong>Email:</strong> ${data.email || "Não informado"}</p>
          <p><strong>Telefone:</strong> ${data.phone || "Não informado"}</p>
          <p><strong>Empresa:</strong> ${data.company || "Não informado"}</p>
      `

      // Informações Básicas do Projeto
      if (data.projectName || data.projectType || data.industry) {
        html += `
          <h2 style="color: #4f46e5; margin-top: 20px;">Informações Básicas do Projeto</h2>
          ${data.projectName ? `<p><strong>Nome do Projeto:</strong> ${data.projectName}</p>` : ""}
          ${data.projectType ? `<p><strong>Tipo de Projeto:</strong> ${data.projectType}</p>` : ""}
          ${data.industry ? `<p><strong>Indústria/Setor:</strong> ${data.industry}</p>` : ""}
        `
      }

      // Identidade Visual
      if (data.existingBranding || data.colorPreferences || data.stylePreferences || data.references) {
        html += `
          <h2 style="color: #4f46e5; margin-top: 20px;">Identidade Visual</h2>
          ${data.existingBranding ? `<p><strong>Identidade Visual Existente:</strong> ${data.existingBranding}</p>` : ""}
          ${data.colorPreferences ? `<p><strong>Preferências de Cores:</strong> ${data.colorPreferences}</p>` : ""}
          ${data.stylePreferences ? `<p><strong>Preferências de Estilo:</strong> ${data.stylePreferences}</p>` : ""}
          ${data.references ? `<p><strong>Referências:</strong> ${data.references}</p>` : ""}
        `
      }

      // Detalhes do Website
      if (data.websiteGoals || data.targetAudience || data.keyFeatures || data.competitors) {
        html += `
          <h2 style="color: #4f46e5; margin-top: 20px;">Detalhes do Website</h2>
          ${data.websiteGoals ? `<p><strong>Objetivos do Website:</strong> ${data.websiteGoals}</p>` : ""}
          ${data.targetAudience ? `<p><strong>Público-Alvo:</strong> ${data.targetAudience}</p>` : ""}
          ${data.keyFeatures ? `<p><strong>Funcionalidades Principais:</strong> ${data.keyFeatures}</p>` : ""}
          ${data.competitors ? `<p><strong>Concorrentes:</strong> ${data.competitors}</p>` : ""}
        `
      }

      // Cronograma e Orçamento
      if (data.timeline || data.budget) {
        html += `
          <h2 style="color: #4f46e5; margin-top: 20px;">Cronograma e Orçamento</h2>
          ${data.timeline ? `<p><strong>Cronograma:</strong> ${data.timeline}</p>` : ""}
          ${data.budget ? `<p><strong>Orçamento:</strong> ${data.budget}</p>` : ""}
        `
      }

      // Informações Adicionais
      if (data.additionalInfo) {
        html += `
          <h2 style="color: #4f46e5; margin-top: 20px;">Informações Adicionais</h2>
          <p>${data.additionalInfo}</p>
        `
      }

      // Verificar se há seções específicas (estrutura alternativa)
      if (data.sections) {
        for (const [sectionName, sectionData] of Object.entries(data.sections)) {
          if (sectionData && typeof sectionData === "object") {
            const sectionTitle = sectionName.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())

            html += `<h2 style="color: #4f46e5; margin-top: 20px;">${sectionTitle}</h2>`

            for (const [key, value] of Object.entries(sectionData)) {
              if (key !== "enabled" && value) {
                const fieldName = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())

                html += `<p><strong>${fieldName}:</strong> ${value}</p>`
              }
            }
          }
        }
      }

      html += `</div>`
      return html
    }

    // Email de confirmação para o cliente
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #4f46e5;">Recebemos seu briefing!</h1>
        <p>Olá ${data.name},</p>
        <p>Obrigado por enviar seu briefing. Recebemos suas informações e entraremos em contato em breve para discutir seu projeto.</p>
        <p>Atenciosamente,</p>
        <p><strong>João Moitinho</strong><br>Web Developer & Designer</p>
      </div>
    `

    // Enviar email para você
    const { data: emailData, error } = await resend.emails.send({
      from: "Briefing <onboarding@resend.dev>",
      to: "joao.silva489@academico.ufgd.edu.br",
      subject: `Novo Briefing de ${data.name}`,
      html: formatBriefingData(data),
    })

    if (error) {
      console.error("Erro ao enviar email para o administrador:", error)
    }

    // Enviar email de confirmação para o cliente
    const { data: confirmationData, error: confirmationError } = await resend.emails.send({
      from: "João Moitinho <onboarding@resend.dev>",
      to: data.email,
      subject: "Recebemos seu briefing!",
      html: confirmationHtml,
    })

    if (confirmationError) {
      console.error("Erro ao enviar email de confirmação para o cliente:", confirmationError)
    }

    return NextResponse.json({
      success: true,
      message: "Briefing recebido com sucesso. Entraremos em contato em breve.",
    })
  } catch (error) {
    console.error("Erro ao processar o formulário de briefing:", error)
    return NextResponse.json(
      { error: "Falha ao processar sua solicitação. Por favor, tente novamente." },
      { status: 500 },
    )
  }
}
