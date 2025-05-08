import { NextResponse } from "next/server"
import { Resend } from "resend"

// Inicializar o Resend com sua chave API
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validação dos campos obrigatórios
    const requiredFields = ["name", "email", "phone"]
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    // Formatar os dados do briefing para o email
    const formatSection = (section: any) => {
      if (!section) return ""

      let html = ""
      Object.entries(section).forEach(([key, value]) => {
        if (key !== "enabled" && value) {
          html += `<p><strong>${key}:</strong> ${value}</p>`
        }
      })

      return html
    }

    // Criar o conteúdo HTML do email
    const emailHtml = `
      <h1 style="color: #4f46e5;">Novo Briefing de ${data.name}</h1>
      
      <h2 style="color: #4f46e5; margin-top: 20px;">Informações de Contato</h2>
      <p><strong>Nome:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Telefone:</strong> ${data.phone}</p>
      <p><strong>Empresa:</strong> ${data.company || "Não informado"}</p>
      
      ${
        data.projectBasics?.enabled
          ? `
        <h2 style="color: #4f46e5; margin-top: 20px;">Informações Básicas do Projeto</h2>
        ${formatSection(data.projectBasics)}
      `
          : ""
      }
      
      ${
        data.visualIdentity?.enabled
          ? `
        <h2 style="color: #4f46e5; margin-top: 20px;">Identidade Visual</h2>
        ${formatSection(data.visualIdentity)}
      `
          : ""
      }
      
      ${
        data.websiteDetails?.enabled
          ? `
        <h2 style="color: #4f46e5; margin-top: 20px;">Detalhes do Website</h2>
        ${formatSection(data.websiteDetails)}
      `
          : ""
      }
      
      ${
        data.timelineBudget?.enabled
          ? `
        <h2 style="color: #4f46e5; margin-top: 20px;">Cronograma e Orçamento</h2>
        ${formatSection(data.timelineBudget)}
      `
          : ""
      }
      
      ${
        data.additionalInfo?.enabled
          ? `
        <h2 style="color: #4f46e5; margin-top: 20px;">Informações Adicionais</h2>
        ${formatSection(data.additionalInfo)}
      `
          : ""
      }
    `

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
      html: emailHtml,
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
