import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, message' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check for API key
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY environment variable is not set');
      return NextResponse.json(
        { error: 'Email service not configured. Please try again later.' },
        { status: 500 }
      );
    }

    // Send email via Resend
    const result = await resend.emails.send({
      from: 'noreply@codecraftai.net',
      to: 'contact@codecraftai.net',
      replyTo: body.email,
      subject: `New Contact Form Submission from ${body.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4F8EF7; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>

          <div style="margin: 20px 0;">
            <p><strong>Name:</strong> ${escapeHtml(body.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(body.email)}</p>
            ${body.phone ? `<p><strong>Phone:</strong> ${escapeHtml(body.phone)}</p>` : ''}
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #333; margin-top: 20px;">Message:</h3>
            <p style="white-space: pre-wrap; color: #555; line-height: 1.6;">
              ${escapeHtml(body.message)}
            </p>
          </div>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;" />

          <p style="color: #999; font-size: 12px; text-align: center;">
            This email was sent from the CodeCraftAI contact form.
          </p>
        </div>
      `,
    });

    // Check if email was sent successfully
    if (result.error) {
      console.error('Resend API error:', result.error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    // Log successful submission
    console.log(`Contact form submitted by ${body.name} (${body.email})`);

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully. We will respond within 24 hours.',
        id: result.data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    // Log the actual error for debugging
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Contact form API error:', errorMessage);

    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

// Helper function to escape HTML special characters
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
