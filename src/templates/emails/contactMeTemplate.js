const contactMeTemplate = (data) => ({
  subject: `Nuevo mensaje de contacto: ${data.subject || "Sin asunto"}`,
  text: `
      Nombre: ${data.name}
      Email: ${data.email}
      Mensaje: ${data.message}
    `,
  html: `
      <h2>Nuevo mensaje de contacto</h2>
      <p><strong>Nombre:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Mensaje:</strong> ${data.message}</p>
    `
});

module.exports = contactMeTemplate;
