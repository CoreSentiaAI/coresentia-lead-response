// app/lib/pdf-generator.ts
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

export async function generatePDF(html: string): Promise<Buffer> {
  let browser = null;
  
  try {
    // For local development
    if (process.env.NODE_ENV === 'development') {
      const puppeteerDev = await import('puppeteer');
      browser = await puppeteerDev.default.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
    } else {
      // For production (Vercel)
      browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      });
    }

    const page = await browser.newPage();
    
    // Set content and wait for fonts to load
    await page.setContent(html, {
      waitUntil: ['networkidle0', 'domcontentloaded']
    });
    
    // Generate PDF with proper settings
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0',
        right: '0',
        bottom: '0',
        left: '0'
      }
    });

    return Buffer.from(pdf);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
