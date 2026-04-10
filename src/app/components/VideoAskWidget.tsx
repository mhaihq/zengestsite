import { useEffect } from "react";

declare global {
  interface Window {
    VIDEOASK_EMBED_CONFIG?: Record<string, unknown>;
  }
}

export function VideoAskWidget() {
  useEffect(() => {
    // Set the config on window
    window.VIDEOASK_EMBED_CONFIG = {
      kind: "widget",
      url: "https://www.videoask.com/fiz5906l4",
      options: {
        widgetType: "VideoThumbnailExtraLarge",
        text: "",
        backgroundColor: "#0F0F40",
        position: "bottom-right",
        dismissible: true,
        videoPosition: "center center",
      },
    };

    // Load the embed script
    const script = document.createElement("script");
    script.src = "https://www.videoask.com/embed/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      document.body.removeChild(script);
      delete window.VIDEOASK_EMBED_CONFIG;
      // Remove any injected VideoAsk iframes/elements
      document.querySelectorAll("[data-videoask-widget]").forEach((el) => el.remove());
      document.querySelectorAll("iframe[src*='videoask']").forEach((el) => el.remove());
    };
  }, []);

  return null;
}