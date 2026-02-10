import { AIVoiceInput } from "./ui/ai-voice-input";
import { useState } from "react";

export function AIVoiceInputDemo() {
  const [recordings, setRecordings] = useState<{ duration: number; timestamp: Date }[]>([]);

  const handleStop = (duration: number) => {
    console.log("Recording stopped, duration:", duration);
    setRecordings(prev => [...prev.slice(-4), { duration, timestamp: new Date() }]);
  };

  return (
    <div className="space-y-8 w-full max-w-md mx-auto bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm">
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-semibold tracking-tight">AI Voice Input</h2>
        <p className="text-sm text-muted-foreground">Click the microphone to start recording</p>
      </div>

      <div className="space-y-4 py-8 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-100 dark:border-zinc-800">
        <AIVoiceInput 
          onStart={() => console.log('Recording started')}
          onStop={handleStop}
        />   
      </div>

      {recordings.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider text-xs">Recent Recordings</h3>
          <div className="space-y-2">
            {recordings.map((rec, i) => (
              <div key={i} className="flex justify-between text-sm p-2 bg-zinc-50 dark:bg-zinc-900/50 rounded border border-zinc-100 dark:border-zinc-800">
                <span>Recording {recordings.length - recordings.indexOf(rec)}</span>
                <span className="font-mono text-muted-foreground">{rec.duration}s</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
