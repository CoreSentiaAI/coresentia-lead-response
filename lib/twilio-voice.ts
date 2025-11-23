/**
 * Twilio Voice TwiML Generation Helpers
 *
 * Generates TwiML responses for voice calls using Google Cloud Neural TTS
 * Voice: Google.en-AU-Neural2-A (Australian accent)
 */

export interface TwiMLOptions {
  message: string;
  continueConversation?: boolean;
  conversationUrl?: string;
  voice?: string;
  language?: string;
  timeout?: number;
  maxSpeechTime?: number;
}

/**
 * Generate TwiML for initial call greeting
 * Returns XML that greets the caller and listens for their response
 */
export function generateGreetingTwiML(
  businessName: string,
  conversationUrl: string
): string {
  const greeting = `Hi, you've reached ${businessName}. I'm the AI assistant. How can I help you today?`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather
    input="speech"
    action="${conversationUrl}"
    method="POST"
    timeout="5"
    speechTimeout="auto"
    speechModel="phone_call"
    language="en-AU"
    enhanced="true"
  >
    <Say voice="Google.en-AU-Neural2-C" language="en-AU">
      <prosody rate="95%" pitch="+0%">${escapeXML(greeting)}</prosody>
    </Say>
  </Gather>
  <Say voice="Google.en-AU-Neural2-C" language="en-AU">Sorry, I didn't hear anything. Please call back when you're ready. Goodbye!</Say>
  <Hangup/>
</Response>`;
}

/**
 * Generate TwiML for ongoing conversation
 * Returns XML that speaks the AI response and listens for the next input
 */
export function generateConversationTwiML(options: TwiMLOptions): string {
  const {
    message,
    continueConversation = true,
    conversationUrl = '',
    voice = 'Google.en-AU-Neural2-C',
    language = 'en-AU',
    timeout = 5,
    maxSpeechTime = 60
  } = options;

  if (!continueConversation) {
    // Final message before hanging up
    return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="${voice}" language="${language}">
    <prosody rate="95%" pitch="+0%">${escapeXML(message)}</prosody>
  </Say>
  <Hangup/>
</Response>`;
  }

  // Continue conversation with speech gathering
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather
    input="speech"
    action="${conversationUrl}"
    method="POST"
    timeout="${timeout}"
    speechTimeout="auto"
    speechModel="phone_call"
    language="${language}"
    maxSpeechTime="${maxSpeechTime}"
    enhanced="true"
  >
    <Say voice="${voice}" language="${language}">
      <prosody rate="95%" pitch="+0%">${escapeXML(message)}</prosody>
    </Say>
  </Gather>
  <Say voice="${voice}" language="${language}">Sorry, I didn't catch that. Let me connect you with the team.</Say>
  <Hangup/>
</Response>`;
}

/**
 * Generate TwiML for call recording
 * Enables recording on the call
 */
export function generateRecordingTwiML(
  message: string,
  conversationUrl: string
): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Record
    action="${conversationUrl}"
    method="POST"
    maxLength="3600"
    playBeep="false"
    recordingStatusCallback="/api/voice/recording-status"
    recordingStatusCallbackMethod="POST"
  />
  <Say voice="Google.en-AU-Neural2-A">${escapeXML(message)}</Say>
</Response>`;
}

/**
 * Generate TwiML for error/fallback scenarios
 */
export function generateErrorTwiML(errorType: 'timeout' | 'unclear' | 'system'): string {
  const messages = {
    timeout: "I apologize, but I need to end this call now. The team will call you back shortly. Goodbye!",
    unclear: "I'm having trouble understanding you. Let me have the team call you back. Goodbye!",
    system: "I'm experiencing technical difficulties. Please call back in a few minutes or the team will reach out to you. Goodbye!"
  };

  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Google.en-AU-Neural2-C" language="en-AU">
    <prosody rate="95%" pitch="+0%">${escapeXML(messages[errorType])}</prosody>
  </Say>
  <Hangup/>
</Response>`;
}

/**
 * Generate TwiML with SSML for natural pauses and emphasis
 * Use for more natural-sounding responses
 */
export function generateSSMLTwiML(
  ssmlContent: string,
  continueConversation: boolean = true,
  conversationUrl: string = ''
): string {
  if (!continueConversation) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Google.en-AU-Neural2-A">
    <prosody rate="medium">${ssmlContent}</prosody>
  </Say>
  <Hangup/>
</Response>`;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather
    input="speech"
    action="${conversationUrl}"
    method="POST"
    timeout="5"
    speechTimeout="auto"
    speechModel="phone_call"
    language="en-AU"
  >
    <Say voice="Google.en-AU-Neural2-A">
      <prosody rate="medium">${ssmlContent}</prosody>
    </Say>
  </Gather>
  <Say voice="Google.en-AU-Neural2-A">Sorry, I didn't hear you. Goodbye!</Say>
  <Hangup/>
</Response>`;
}

/**
 * Escape XML special characters for TwiML
 */
function escapeXML(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Add natural pauses to text for SSML
 * Example: "Hello. <break/> How can I help you?"
 */
export function addNaturalPauses(text: string): string {
  return text
    .replace(/\. /g, '. <break time="300ms"/> ')
    .replace(/\? /g, '? <break time="400ms"/> ')
    .replace(/! /g, '! <break time="400ms"/> ');
}

/**
 * Parse Twilio voice webhook parameters
 */
export interface TwilioVoiceParams {
  CallSid: string;
  From: string;
  To: string;
  CallStatus?: string;
  Direction?: string;
  SpeechResult?: string;
  Confidence?: string;
}

export function parseTwilioVoiceParams(params: URLSearchParams): TwilioVoiceParams {
  return {
    CallSid: params.get('CallSid') || '',
    From: params.get('From') || '',
    To: params.get('To') || '',
    CallStatus: params.get('CallStatus') || undefined,
    Direction: params.get('Direction') || undefined,
    SpeechResult: params.get('SpeechResult') || undefined,
    Confidence: params.get('Confidence') || undefined,
  };
}
