import { useEffect } from 'react';

declare global {
  interface Window {
    BrevoConversationsID?: string;
    BrevoConversations?: any;
  }
}

export function BrevoWidget() {
  useEffect(() => {
    (function(d: Document, w: Window, c: string) {
      w.BrevoConversationsID = '67b365fd0bd1a2c16f00e667';
      w[c as any] = w[c as any] || function() {
        (w[c as any].q = w[c as any].q || []).push(arguments);
      };
      var s = d.createElement('script');
      s.async = true;
      s.src = 'https://conversations-widget.brevo.com/brevo-conversations.js';
      if (d.head) d.head.appendChild(s);
    })(document, window, 'BrevoConversations');
  }, []);

  return null;
}
