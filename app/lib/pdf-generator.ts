// app/lib/pdf-generator.ts
export async function generatePDF(html: string, documentName: string = 'document.pdf'): Promise<Buffer> {
  const response = await fetch('https://api.docraptor.com/docs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_credentials: process.env.DOCRAPTOR_API_KEY!,
      doc: {
        name: documentName,
        document_type: 'pdf',
        document_content: html,
        test: false, // Set to true for testing (won't count against quota)
      }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`DocRaptor error: ${error}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
