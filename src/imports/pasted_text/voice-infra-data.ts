import { useState, useMemo } from "react";

const DATA = {"Core Voice Infrastructure":{"TTS, Voice Synthesis & Cloning":[{"n":"ElevenLabs","u":"https://elevenlabs.io"},{"n":"PlayAI","u":"https://play.ai"},{"n":"Murf AI","u":"https://murf.ai"},{"n":"Synthesia","u":"https://synthesia.io"},{"n":"Resemble AI","u":"https://resemble.ai"},{"n":"WellSaid","u":"https://wellsaid.io"},{"n":"MetaVoice","u":"https://metavoice.io"},{"n":"Inworld AI","u":"https://inworld.ai"},{"n":"Respeecher","u":"https://respeecher.com"},{"n":"Fish Audio","u":"https://fish.audio"},{"n":"Deepdub","u":"https://deepdub.ai"},{"n":"Rime","u":"https://rime.ai"},{"n":"Verbatik","u":"https://verbatik.com"},{"n":"Capacity","u":"https://capacity.com"},{"n":"Voxygen","u":"https://voxygen.fr"},{"n":"Speech Morphing, Inc.","u":"https://speechmorphinc.com"},{"n":"Acapela Group","u":"https://acapela-group.com"},{"n":"Synthesys AI Studio","u":"https://synthesys.io"},{"n":"My Voice AI","u":"https://myvoice.ai"},{"n":"Kits.AI","u":"https://kits.ai"},{"n":"CoeFont","u":"https://coefont.cloud"},{"n":"AudioPod AI","u":"https://audiopod.ai"},{"n":"Mico Voice AI","u":"https://micovoice.com"}],"STT, ASR & Transcription":[{"n":"Deepgram","u":"https://deepgram.com"},{"n":"AssemblyAI","u":"https://assemblyai.com"},{"n":"Otter.ai","u":"https://otter.ai"},{"n":"Gladia","u":"https://gladia.io"},{"n":"Verbit.ai","u":"https://verbit.ai"},{"n":"Ultravox.ai","u":"https://ultravox.ai"},{"n":"Parlance","u":"https://parlancecorp.com"},{"n":"Floatbot.AI","u":"https://floatbot.ai"},{"n":"Mod9 Technologies","u":"https://mod9.com"},{"n":"Vocapia Research","u":"https://vocapia.com"},{"n":"ActionPower","u":"https://actionpower.kr"},{"n":"Yobe Inc.","u":"https://yobeinc.com"},{"n":"iFLYTEK Open Platform","u":"https://xfyun.cn"},{"n":"Kanari AI","u":"https://kanari.ai"},{"n":"Goodcall","u":"https://goodcall.com"},{"n":"Keen Research","u":"https://keenresearch.com"},{"n":"Modulate","u":"https://modulate.ai"},{"n":"Whissle AI","u":"https://whissle.ai"},{"n":"Aqua Voice","u":"https://withaqua.com"},{"n":"EML Speech Technology GmbH","u":"https://eml.org"},{"n":"Prosper AI","u":"https://getprosper.ai"},{"n":"Healthsync AI","u":"https://healthsync.tech"},{"n":"Puretalk.ai","u":"https://puretalk.ai"},{"n":"NexaVoxa AI","u":"https://nexavoxa.com"},{"n":"Voicing AI","u":"https://voicing.ai"},{"n":"Crescendo","u":"https://crescendosystems.co.uk"},{"n":"Starling AI","u":"https://starling-ai.com"},{"n":"Indus Labs","u":"https://induslabs.io"},{"n":"MediLogix","u":"https://medilogix.net"},{"n":"Voice AI","u":"https://voice.ai"},{"n":"Clara Health","u":"https://clarahealth.co"},{"n":"Aldea","u":"https://aldea.ai"}],"Audio Intelligence & Speech Analytics":[{"n":"Hume AI","u":"https://hume.ai"},{"n":"Behavioral Signals","u":"https://behavioralsignals.com"},{"n":"IRIS Audio Technologies","u":"https://iris.audio"},{"n":"Voicesense","u":"https://voicesense.com"},{"n":"Prosodica","u":"https://prosodica.com"},{"n":"audEERING GmbH","u":"https://audeering.com"},{"n":"pyannoteAI","u":"https://pyannote.ai"},{"n":"Altolabs Inc.","u":"https://altolabs.ai"},{"n":"Synthetic Media Processing Laboratory","u":"https://simplertc.com"},{"n":"Waveshaper AI","u":"https://waveshaper.ai"},{"n":"OmniSpeech LLC","u":"https://omni-speech.com"},{"n":"Dubbing AI","u":"https://dubbingai.io"},{"n":"ai-coustics GmbH","u":"https://ai-coustics.com"},{"n":"Emotion Logic Ltd","u":"https://emotionlogic.ai"},{"n":"Bevoiceai","u":"https://bevoiceai.com"}],"Foundation Models & Voice-Native AI":[{"n":"Scale AI","u":"https://scale.com"},{"n":"Cohere","u":"https://cohere.com"},{"n":"AI21 Labs","u":"https://ai21.com"},{"n":"Blue Machines AI","u":"https://bluemachines.ai"},{"n":"Deepslate","u":"https://deepslate.eu"}]},"Voice Agent Platforms":{"Agent Orchestration & Builders":[{"n":"Voiceflow","u":"https://voiceflow.com"},{"n":"Kore.ai","u":"https://kore.ai"},{"n":"Rasa","u":"https://rasa.com"},{"n":"Synthflow AI","u":"https://synthflow.ai"},{"n":"REGAL","u":"https://regal.ai"},{"n":"Picovoice","u":"https://picovoice.ai"},{"n":"Parloa","u":"https://parloa.com"},{"n":"Avaamo","u":"https://avaamo.ai"},{"n":"aiOla","u":"https://aiola.ai"},{"n":"gnani.ai","u":"https://gnani.ai"},{"n":"Voxia","u":"https://voxia.ai"},{"n":"Voyce AI","u":"https://voyce.ai"},{"n":"EVE.calls","u":"https://evecalls.com"},{"n":"Intron Voice AI","u":"https://intron.io"},{"n":"Awaz.ai","u":"https://awaz.ai"},{"n":"Orion Labs","u":"https://orionlabs.io"},{"n":"JIQ AI","u":"https://jiq.ai"},{"n":"Rivvi AI, Inc","u":"https://rivvi.ai"},{"n":"VoiceCare AI","u":"https://voicecare.ai"},{"n":"CallBotics","u":"https://callbotics.ai"},{"n":"Kartha","u":"https://karthaai.com"},{"n":"Nova Echo AI","u":"https://novaecho.ai"},{"n":"Live Human AI","u":"https://livehuman.ai"},{"n":"VisionairAI","u":"https://visionairai.org"},{"n":"AlloMia","u":"https://allomia.com"},{"n":"AIM AI","u":"https://aimnow.ai"},{"n":"PartnerHero","u":"https://crescendo.ai"},{"n":"Exa","u":"https://exa.ai"},{"n":"Pype AI","u":"https://pypeai.com"},{"n":"Xpectrum AI","u":"https://xpectrum-ai.com"}],"Telephony, Runtime & Call Ops":[{"n":"Retell AI","u":"https://retellai.com"},{"n":"Bland","u":"https://bland.com"},{"n":"Telnyx","u":"https://telnyx.com"},{"n":"Symbl.ai","u":"https://symbl.ai"},{"n":"Tucuvi","u":"https://tucuvi.com"},{"n":"Cally Agent","u":"https://callyagent.io"},{"n":"Orato","u":"https://tryorato.com"},{"n":"LoyJoy","u":"https://loyjoy.com"},{"n":"Salk AI","u":"https://salk.ai"},{"n":"Orby AI","u":"https://orby.ai"},{"n":"NIMIR","u":"https://nimircorp.com"}],"Testing, Evaluation & Observability":[{"n":"Cyara","u":"https://cyara.com"},{"n":"Langtail","u":"https://langtail.com"},{"n":"ViClinic","u":"https://viclinic.com"}]},"Engagement Applications":{"Healthcare & Patient Engagement":[{"n":"Hippocratic AI","u":"https://hippocraticai.com"},{"n":"Ambience Healthcare","u":"https://ambiencehealthcare.com"},{"n":"Abridge","u":"https://abridge.com"},{"n":"Hyro","u":"https://hyro.ai"},{"n":"Luma Health","u":"https://lumahealth.io"},{"n":"Artera","u":"https://artera.io"},{"n":"Cadence","u":"https://cadence.care"},{"n":"MyndYou","u":"https://myndyou.com"},{"n":"Medisafe","u":"https://medisafe.com"},{"n":"Orbita","u":"https://orbita.ai"},{"n":"Attune","u":"https://attune.ai"},{"n":"Nyra AI","u":"https://nyraai.io"},{"n":"Clinii","u":"https://clinii.com"},{"n":"BridgeHealthAI","u":"https://bridgehealthequity.com"},{"n":"Droxi Digital Health","u":"https://droxi.ai"},{"n":"Assort Health","u":"https://assorthealth.com"},{"n":"ActiumHealth","u":"https://actiumhealth.com"},{"n":"Brilo AI","u":"https://brilo.ai"},{"n":"Phelix.ai","u":"https://phelix.ai"},{"n":"Caregentic","u":"https://caregentic.com"},{"n":"CareBestie","u":"https://carebestie.com"},{"n":"EmpowerHealth","u":"https://empowerhealth.ai"},{"n":"Vasquez Platform","u":"https://vasquezplatform.com"},{"n":"ContactSwing.AI","u":"https://contactswing.ai"},{"n":"QuantumLoopAi","u":"https://quantumloopai.com"},{"n":"Vitarys","u":"https://vitarys.com"},{"n":"TrampolineAI","u":"https://trampolineai.com"},{"n":"Ostro","u":"https://ostrohealth.com"},{"n":"Medical Office Force","u":"https://medicalofficeforce.com"},{"n":"Pubgenius Inc.","u":"https://pubgenius.io"},{"n":"Olimi AI","u":"https://olimi.ai"},{"n":"Gravity Rail","u":"https://gravityrail.com"},{"n":"VOCALLS","u":"https://vocalls.ai"},{"n":"Paratus Health","u":"https://paratushealth.com"},{"n":"MayaMD.AI","u":"https://mayamd.ai"},{"n":"VoxxyAgent AI","u":"https://voxxyagent.ai"},{"n":"Popai Health","u":"https://popai.health"},{"n":"OmniHelio","u":"https://omnihelio.com"},{"n":"Adni","u":"https://adni.ai"},{"n":"Tabia Health","u":"https://tabiahealth.com"},{"n":"Cairns Health","u":"https://cairns.ai"},{"n":"Yeswici LLC","u":"https://ranty.net"},{"n":"Verbal","u":"https://tryverbal.com"},{"n":"CueZen","u":"https://cuezen.com"},{"n":"Areti Health","u":"https://aretihealth.com"},{"n":"VoiceSpin","u":"https://voicespin.com"},{"n":"Callsure AI","u":"https://callsure.ai"},{"n":"Pharmesol","u":"https://pharmesol.com"},{"n":"CallVitalz Inc.","u":"https://callvitalz.com"},{"n":"Voice-Care","u":"https://voice-care.com"},{"n":"Prodoc AI","u":"https://prodoc.ai"},{"n":"Alden","u":"https://alden.health"},{"n":"Inflo Health","u":"https://inflohealth.com"},{"n":"VoxyHealth","u":"https://voxyhealth.ai"},{"n":"Altira Health","u":"https://altirahealth.com"},{"n":"Mai Call","u":"https://maicall.ai"},{"n":"Lifelink Systems","u":"https://lifelinksystems.com"},{"n":"Amplify Craft","u":"https://amplifycraft.com"},{"n":"AcquisitionAI","u":"https://acquisitionai.com"},{"n":"Kouper","u":"https://kouperhealth.com"},{"n":"ManageCare","u":"https://managecare.ai"},{"n":"WellSaid AI","u":"https://wellsaid.ai"},{"n":"Callie Care","u":"https://getcallie.care"},{"n":"Aiva Health","u":"https://aivahealth.com"},{"n":"Vocal Agent Ai","u":"https://vocalagent.eu"},{"n":"HealthTalk A.I.","u":"https://healthtalkai.com"},{"n":"OhMD","u":"https://ohmd.com"},{"n":"Attuned Intelligence","u":"https://attuned-intelligence.com"},{"n":"Consig","u":"https://consig.ai"},{"n":"Althea Health","u":"https://altheahealth.io"},{"n":"6omb AI","u":"https://6omb.ai"}],"Patient Access, Scheduling & Admin":[{"n":"Syllable AI","u":"https://syllable.ai"},{"n":"Infinitus Systems","u":"https://infinitus.ai"},{"n":"SuperDial","u":"https://superdial.com"},{"n":"Hello Patient","u":"https://hellopatient.com"},{"n":"Talkie.ai","u":"https://talkie.ai"},{"n":"Heidi","u":"https://heidihealth.com"},{"n":"Operator Labs","u":"https://operatorlabs.ai"},{"n":"Parakeet Health","u":"https://parakeethealth.com"},{"n":"Callin.io","u":"https://callin.io"},{"n":"VINSI.AI","u":"https://vinsi.ai"},{"n":"Caretalk","u":"https://caretalk.ai"},{"n":"PracticePilot AI","u":"https://practicepilotai.com"},{"n":"OmniMD","u":"https://omnimd.com"},{"n":"Pretty Good AI","u":"https://prettygoodai.com"},{"n":"MIEA Health","u":"https://mieahealth.com"},{"n":"Holly by Nimblr.ai","u":"https://nimblr.ai"},{"n":"NextServices","u":"https://nextservices.com"},{"n":"PatientGenie","u":"https://patientgenie.com"},{"n":"LunaBill","u":"https://lunabill.com"},{"n":"VCare Health","u":"https://vcare-health.com"},{"n":"Roseline AI","u":"https://roseline.ai"},{"n":"CareCall","u":"https://carecall.ai"},{"n":"Gupshup","u":"https://gupshup.ai"},{"n":"Clinic Dial AI","u":"https://clinicdialai.com"},{"n":"Outbound AI","u":"https://outbound.ai"},{"n":"VoCall","u":"https://getvocall.com"},{"n":"Auxilis AI","u":"https://auxilis.ai"},{"n":"Standard Practice AI","u":"https://standardpractice.ai"},{"n":"Reggie Health","u":"https://reggiehealth.ai"},{"n":"dentalrobot","u":"https://dentalrobot.ai"},{"n":"TechNovaTime","u":"https://technovatime.com"},{"n":"Inquira Health","u":"https://inquira.health"},{"n":"Linear Health","u":"https://linear.health"},{"n":"RingEmAll","u":"https://ringemall.com"},{"n":"Transform9","u":"https://transform9.com"},{"n":"Allyzent","u":"https://allyzent.com"}],"Customer Support & Contact Center":[{"n":"PolyAI","u":"https://poly.ai"},{"n":"Observe.AI","u":"https://observe.ai"},{"n":"ASAPP","u":"https://asapp.com"},{"n":"Cresta","u":"https://cresta.com"},{"n":"Decagon","u":"https://decagon.ai"},{"n":"Aisera","u":"https://aisera.com"},{"n":"Maven AGI","u":"https://mavenagi.com"},{"n":"Tovie AI","u":"https://tovie.ai"},{"n":"Loris","u":"https://loris.ai"},{"n":"NoraVoice","u":"https://noravoice.ai"},{"n":"purpleScape","u":"https://purplescape.com"},{"n":"Novaurion","u":"https://novaurion.com"},{"n":"Xtend.AI","u":"https://xtend.ai"},{"n":"OpenMic AI","u":"https://openmic.ai"}],"Sales & Revenue Engagement":[{"n":"Gong","u":"https://gong.io"},{"n":"Dialo","u":"https://dialo.ai"}],"Accessibility & Consumer Voice":[{"n":"Sanas","u":"https://sanas.ai"},{"n":"DeepL","u":"https://deepl.com"},{"n":"CAMB.AI","u":"https://camb.ai"},{"n":"Nagish","u":"https://nagish.com"},{"n":"VocaliD","u":"https://vocalid.ai"}]}};

const LAYERS = [
  {
    key: "Core Voice Infrastructure",
    label: "Core Voice Infrastructure",
    tagline: "The organs. STT, TTS, audio intelligence, and foundation models that power every voice AI system.",
    color: "#4A7BA7",
    bgColor: "#E8EDF2",
    bucketOrder: ["STT, ASR & Transcription", "TTS, Voice Synthesis & Cloning", "Audio Intelligence & Speech Analytics", "Foundation Models & Voice-Native AI"],
  },
  {
    key: "Voice Agent Platforms",
    label: "Voice Agent Platforms",
    tagline: "The nervous system. Orchestration, telephony, and tooling that connect infrastructure to real conversations.",
    color: "#5A5A72",
    bgColor: "#F0EDE8",
    bucketOrder: ["Agent Orchestration & Builders", "Telephony, Runtime & Call Ops", "Testing, Evaluation & Observability"],
  },
  {
    key: "Engagement Applications",
    label: "Engagement Applications",
    tagline: "The interface. Where voice AI meets patients, clinicians, and care workflows.",
    color: "#8B4513",
    bgColor: "#F5F0EB",
    bucketOrder: ["Healthcare & Patient Engagement", "Patient Access, Scheduling & Admin", "Customer Support & Contact Center", "Sales & Revenue Engagement", "Accessibility & Consumer Voice"],
  },
];

const BUCKET_ICONS = {
  "STT, ASR & Transcription": "hearing",
  "TTS, Voice Synthesis & Cloning": "voice",
  "Audio Intelligence & Speech Analytics": "wave",
  "Foundation Models & Voice-Native AI": "brain",
  "Agent Orchestration & Builders": "orchestrate",
  "Telephony, Runtime & Call Ops": "phone",
  "Testing, Evaluation & Observability": "test",
  "Healthcare & Patient Engagement": "health",
  "Patient Access, Scheduling & Admin": "calendar",
  "Customer Support & Contact Center": "support",
  "Sales & Revenue Engagement": "revenue",
  "Accessibility & Consumer Voice": "access",
};

const Icon = ({ type, size = 18, color = "#5A5A72" }) => {
  const s = { width: size, height: size, display: "inline-block" };
  const icons = {
    hearing: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M2 12a10 10 0 0 1 20 0M5 12a7 7 0 0 1 14 0M8 12a4 4 0 0 1 8 0"/><circle cx="12" cy="12" r="1" fill={color}/></svg>,
    voice: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M12 1v22M8 4v16M4 8v8M16 4v16M20 8v8"/></svg>,
    wave: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M2 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0 2 4 4 0"/></svg>,
    brain: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 3c-2 3-2 6 0 9s2 6 0 9M3 12h18"/></svg>,
    orchestrate: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><circle cx="12" cy="6" r="3"/><circle cx="5" cy="18" r="3"/><circle cx="19" cy="18" r="3"/><path d="M12 9v3M8 16l3-4M16 16l-3-4"/></svg>,
    phone: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
    test: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M9 3h6M12 3v7l5 8H7l5-8z"/></svg>,
    health: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>,
    calendar: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
    support: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
    revenue: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 010 7H6"/></svg>,
    access: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
    search: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
    close: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>,
    external: <svg style={{width:12,height:12,display:"inline-block"}} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>,
  };
  return icons[type] || null;
};

const totalCompanies = Object.values(DATA).reduce((sum, buckets) =>
  sum + Object.values(buckets).reduce((s, companies) => s + companies.length, 0), 0
);

function CompanyPill({ company, isHighlighted, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "5px 11px",
        margin: "3px",
        border: "1px solid " + (isHighlighted ? "#4A7BA7" : "#D0D0DC"),
        borderRadius: "3px",
        background: isHighlighted ? "#E8EDF2" : "#FFFFFF",
        cursor: "pointer",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        fontSize: "12.5px",
        color: "#1A1A2E",
        transition: "all 0.15s ease",
        letterSpacing: "0.01em",
        lineHeight: 1.2,
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = "#4A7BA7";
        e.currentTarget.style.background = "#E8EDF2";
      }}
      onMouseOut={(e) => {
        if (!isHighlighted) {
          e.currentTarget.style.borderColor = "#D0D0DC";
          e.currentTarget.style.background = "#FFFFFF";
        }
      }}
    >
      {company.n}
    </button>
  );
}

const ENRICHED={"Verbatik":{"d":"Voice AI infrastructure provider specializing in Text-to-Speech, Voice Cloning, and speech-enabled product development; offers developer APIs, SDKs, REST endpoints.","t":["2 employees","Founded 2022"]},"Synthetic Media Processing Laboratory":{"d":"Specializing in core voice AI technology, providing SDKs that enable real-time audio processing, speech recognition, and natural voice interactions.","t":["9 employees","Founded 2021"]},"Mod9 Technologies":{"d":"Specializing in speech and language technologies. Develops an ASR Engine accessible via REST API and SDKs.","t":["2 employees"]},"Otter.ai":{"d":"Specializing in real-time voice transcription, speaker diarization, and voice AI infrastructure.","t":["$83M funding","$12.9M revenue","207 employees","Mountain View"]},"Vocapia Research":{"d":"Voice AI infrastructure company specializing in multilingual speech processing; develops core speech recognition and speaker diarization technologies.","t":["$6M revenue","7 employees","Founded 2000"]},"Capacity":{"d":"Offers core voice AI infrastructure, including neural text-to-speech synthesis and real-time speech-to-text transcription."},"Voicesense":{"d":"Specializing in behavioral and predictive speech analytics, offering API-based voice emotion and sentiment analysis technology.","t":["7 employees","Founded 2016","Singapore"]},"WellSaid":{"d":"Specializing in AI voice synthesis; offers a developer-first Text-to-Speech API with real-time streaming and customization.","t":["$10M funding","$15M revenue","58 employees","Founded 2018"]},"Waveshaper AI":{"d":"Specializing in real-time neural signal processing for audio samples; develops core technology for voice AI applications.","t":["3 employees","Founded 2022"]},"Ultravox.ai":{"d":"Specializing in real-time voice AI infrastructure, providing APIs and SDKs for multiple platforms with automatic speech recognition.","t":["$34M funding","$2.3M revenue","12 employees","Founded 2022","Seattle"]},"ActionPower":{"d":"South Korean AI deep tech startup specializing in voice AI infrastructure; develops ASR, NLP, and emotion analysis technologies.","t":["$15.1M funding","21 employees","Founded 2016"]},"Yobe Inc.":{"d":"Specializing in voice data extraction, analytics, and speech recognition technologies with noise-robust deployment.","t":["$1.8M funding","Founded 2017"]},"iFLYTEK Open Platform":{"d":"Provides core speech recognition, real-time ASR, and TTS APIs and SDKs for developers.","t":["Founded 2010"]},"Kanari AI":{"d":"Specializing in speech technology solutions including automatic speech recognition and text-to-speech synthesis.","t":["$1.3M funding","2 employees","Founded 2020"]},"Goodcall":{"d":"Provides a Voice AI API supporting real-time speech recognition, natural language understanding, and voice synthesis.","t":["$10.7M revenue","6 employees","Founded 2021"]},"Gladia":{"d":"AI infrastructure company specializing in speech-to-text, translation, and audio intelligence APIs with real-time, low-latency recognition.","t":["$19.9M funding","63 employees","Founded 2022"]},"Keen Research":{"d":"Specializing in on-device automatic speech recognition (ASR) technology; develops SDKs for iOS, Android, Web platforms.","t":["4 employees"]},"Modulate":{"d":"Specializing in prosocial voice technology and AI architecture; provides real-time voice moderation via the ToxMod platform.","t":["$66M funding","$5.5M revenue","54 employees","Founded 2019"]},"Verbit.ai":{"d":"Develops AI-based transcription and captioning solutions, offering core voice AI infrastructure via RESTful API.","t":["$115M revenue","813 employees","Founded 2017"]},"MetaVoice":{"d":"Specializing in conversational speech synthesis, voice cloning, and real-time streaming audio processing.","t":["9 employees","Founded 2022"]},"Inworld AI":{"d":"Offers advanced voice AI solutions including text-to-speech, voice cloning, and real-time speech APIs with sub-200ms latency.","t":["$175.7M funding","$2.0M revenue","87 employees"]},"Respeecher":{"d":"AI voice cloning company that creates high-fidelity synthetic voices for media production and enterprise applications."},"Fish Audio":{"d":"Voice AI platform offering text-to-speech synthesis and voice cloning with multilingual support."},"Deepdub":{"d":"AI-powered dubbing and voice localization platform for media content."},"Rime":{"d":"Voice AI infrastructure company building low-latency text-to-speech APIs for developers."},"Hume AI":{"d":"Specializing in voice emotion analysis and AI-driven human emotion understanding; offers the Empathic Voice Interface API."},"Behavioral Signals":{"d":"AI company analyzing human behavior through voice, providing emotion and behavior recognition APIs.","t":["Founded 2016"]},"IRIS Audio Technologies":{"d":"Develops core audio AI infrastructure with real-time noise removal and speech transcription enhancement.","t":["$10M funding","39 employees","Founded 2018"]},"Prosodica":{"d":"Develops enterprise-grade AI-powered engines that automatically tag, classify, and score customer conversations.","t":["4 employees","Founded 2012"]},"audEERING GmbH":{"d":"Specializing in audio intelligence, offering speech emotion recognition and acoustic analysis solutions."},"pyannoteAI":{"d":"Open-source speaker diarization and voice activity detection toolkit, now offering commercial APIs."},"Altolabs Inc.":{"d":"Audio intelligence and speech analytics company providing voice AI infrastructure solutions."},"Dubbing AI":{"d":"AI-powered dubbing platform for voice localization and content translation."},"ai-coustics GmbH":{"d":"AI-powered speech enhancement technology for improving voice clarity in real-time communications."},"Emotion Logic Ltd":{"d":"Voice emotion detection technology analyzing vocal biomarkers for truthfulness and emotional state."},"Bevoiceai":{"d":"Voice AI analytics platform for behavioral insights from speech patterns."},"Scale AI":{"d":"AI data infrastructure company providing training data, evaluation, and deployment tools for AI models.","t":["$1.6B funding","$1.4B revenue","543 employees","Founded 2016"]},"Cohere":{"d":"Enterprise AI company building large language models and NLP infrastructure for business applications.","t":["$970M funding","$35M revenue","450 employees","Founded 2019"]},"AI21 Labs":{"d":"Develops foundation models and AI systems for enterprise use, with partnerships enabling voice AI applications.","t":["$936M funding","$57.8M revenue","210 employees"]},"Blue Machines AI":{"d":"Building foundation models optimized for voice-native AI applications."},"Deepslate":{"d":"European AI company developing voice-native foundation models and speech processing infrastructure."},"ElevenLabs":{"d":"Voice AI company specializing in text-to-speech, voice synthesis, and voice cloning; offers a free online TTS platform and API.","t":["$881M funding","543 employees","Founded 2022"]},"PlayAI":{"d":"Voice AI platform offering realistic text-to-speech and conversational AI agents for developers."},"Murf AI":{"d":"AI voice generator offering 200+ realistic voices in multiple languages with text-to-speech and voice cloning APIs.","t":["$11.5M funding","$2M revenue","113 employees"]},"Synthesia":{"d":"AI video communications platform with text-to-speech engine and voice cloning supporting 160+ languages.","t":["$549.8M funding","$100M revenue","573 employees"]},"Resemble AI":{"d":"Voice AI platform for text-to-speech, voice cloning, and real-time voice conversion with developer APIs."},"Acapela Group":{"d":"Develops personalized digital voices using Neural TTS with 30+ languages and 200+ voices.","t":["$12M revenue","33 employees"]},"Synthesys AI Studio":{"d":"AI content creation tools specializing in voice, video, and image generation with TTS API.","t":["2 employees","Founded 2020"]},"My Voice AI":{"d":"Text-to-speech and custom voice generation platform for personalized voice AI applications."},"Kits.AI":{"d":"AI voice platform for music creators offering voice cloning and voice-to-voice conversion tools."},"CoeFont":{"d":"Japanese AI voice platform offering text-to-speech synthesis with natural-sounding voices."},"AudioPod AI":{"d":"AI-powered podcast and audio content creation platform with text-to-speech capabilities."},"Mico Voice AI":{"d":"AI platform specializing in multilingual call flow automation with speech-to-text and text-to-speech."},"Speech Morphing, Inc.":{"d":"AI speech technology company developing text-to-speech and speech-to-speech solutions.","t":["2 employees"]},"Voxygen":{"d":"French company specializing in voice synthesis and voice cloning technology with REST API for TTS.","t":["11 employees","Founded 2011"]},"Picovoice":{"d":"On-device voice AI platform offering wake word detection, speech-to-text, and NLU for privacy-first applications."},"Parloa":{"d":"AI-powered contact center platform with voice agent orchestration for enterprise customer service."},"Voiceflow":{"d":"No-code platform for building, managing, and deploying AI voice and chat agents at scale."},"Kore.ai":{"d":"Enterprise conversational AI platform with voice agent orchestration and omnichannel deployment."},"Rasa":{"d":"Open-source conversational AI framework for building contextual voice and text assistants."},"Synthflow AI":{"d":"No-code platform for deploying voice AI agents that automate phone calls in contact centers.","t":["$49M funding","68 employees","Founded 2023","Berlin"]},"REGAL":{"d":"AI-powered outbound calling platform for revenue teams with voice agent orchestration.","t":["$83.5M funding"]},"Avaamo":{"d":"Voice AI platform supporting 2B+ interactions annually across healthcare, customer service, and HR.","t":["$30.5M funding","$9.3M revenue","112 employees","Founded 2014"]},"aiOla":{"d":"Voice AI platform for frontline workers enabling natural language interaction with business systems."},"gnani.ai":{"d":"Conversational AI company offering voice automation, speech analytics, and voice biometrics.","t":["$4.7M funding","Founded 2016"]},"Voxia":{"d":"Voice AI agent platform for automated phone conversations and customer engagement."},"Voyce AI":{"d":"Voice AI platform for building and deploying conversational voice agents."},"EVE.calls":{"d":"AI-powered voice agent platform for automated outbound and inbound calling."},"Intron Voice AI":{"d":"Voice AI agent builder for enterprise phone automation and customer interactions."},"Awaz.ai":{"d":"No-code platform for building human-like AI voice agents capable of making and answering calls 24/7.","t":["6 employees","Founded 2024"]},"Orion Labs":{"d":"Voice-first intelligent collaboration platform for frontline workforce productivity.","t":["$63M funding","$9.6M revenue","6 employees","Founded 2013"]},"JIQ AI":{"d":"Develops AI Voice Robots powered by speech synthesis and recognition for customer service and sales.","t":["8 employees","Founded 2022"]},"Retell AI":{"d":"Voice AI infrastructure for building and deploying human-like conversational AI phone agents."},"Bland":{"d":"AI phone calling platform enabling businesses to automate inbound and outbound calls at scale."},"Telnyx":{"d":"Cloud communications platform offering voice, messaging, and networking APIs for developers.","t":["$120M funding"]},"Symbl.ai":{"d":"Conversational intelligence platform providing real-time speech-to-text and conversation analytics APIs."},"Tucuvi":{"d":"Healthcare voice AI company automating patient follow-up calls with clinical-grade conversational agents.","t":["Founded 2019"]},"Cyara":{"d":"AI-powered CX assurance platform for testing and monitoring voice and digital customer experiences.","t":["$40.5M funding"]},"Langtail":{"d":"Low-code platform for testing AI applications including voice AI agents with simulations.","t":["$1M funding","4 employees","Founded 2023"]},"Hippocratic AI":{"d":"Healthcare AI company developing safety-focused large language models and multimodal voice AI for healthcare communication.","t":["$402M funding","$76M revenue","200 employees","Founded 2023"]},"Ambience Healthcare":{"d":"AI-powered clinical documentation and ambient AI platform for healthcare providers.","t":["$100M funding"]},"Abridge":{"d":"AI-powered clinical conversation platform that generates medical documentation from patient-doctor dialogues.","t":["$212.5M funding"]},"Hyro":{"d":"Specializing in voice AI solutions for enterprise call center automation and healthcare workflows.","t":["$140M funding","$18.5M revenue","143 employees","Founded 2018"]},"Luma Health":{"d":"AI-powered patient engagement platform for healthcare organizations."},"Artera":{"d":"Patient communications platform using AI to orchestrate multi-channel healthcare engagement."},"Cadence":{"d":"Remote patient monitoring and chronic care management platform with AI-driven engagement."},"MyndYou":{"d":"AI-enabled care management company with MyEleanor voice agent for proactive patient engagement.","t":["$4M funding","$6M revenue","34 employees","Founded 2016"]},"Medisafe":{"d":"Healthcare technology company with VIA (Voice Intelligent Agent) for patient engagement and medication adherence.","t":["$18.4M revenue","66 employees","Founded 2012"]},"Orbita":{"d":"Conversational AI platform purpose-built for healthcare virtual assistants and patient engagement."},"Clinii":{"d":"AI healthcare company with Clinii Connect-AI for real-time voice communication in chronic care management."},"BridgeHealthAI":{"d":"Developing HIPAA-compliant, multilingual voice AI agents for healthcare outreach and health equity.","t":["3 employees","Founded 2024"]},"Droxi Digital Health":{"d":"Healthcare AI company specializing in voice agents for clinical inbox management and workflow automation."},"Assort Health":{"d":"AI-powered patient access and call management platform for healthcare organizations."},"ActiumHealth":{"d":"Voice AI platform for healthcare patient engagement and automated communication workflows."},"Brilo AI":{"d":"AI voice agent platform with healthcare-specific solutions for patient communication."},"Phelix.ai":{"d":"AI-powered healthcare communication platform automating patient interactions and clinical workflows."},"Caregentic":{"d":"AI-driven patient engagement platform for chronic care and remote patient monitoring."},"CareBestie":{"d":"AI health assistant providing personalized patient engagement and care navigation."},"EmpowerHealth":{"d":"AI-powered patient engagement platform for healthcare providers and health systems."},"Vasquez Platform":{"d":"Building the first multi-agent AI ecosystem with Voice AI Nurse Victoria for healthcare agencies.","t":["24 employees","Founded 2018"]},"ContactSwing.AI":{"d":"AI voice agent platform with healthcare-specific engagement and patient communication solutions."},"QuantumLoopAi":{"d":"AI-powered patient engagement and healthcare workflow automation platform."},"Vitarys":{"d":"AI assistants designed specifically for social healthcare and patient engagement."},"Ostro":{"d":"AI-powered healthcare operations platform for patient engagement and clinical workflow automation."},"Gravity Rail":{"d":"Voice AI platform for healthcare patient engagement and automated follow-up communications."},"VOCALLS":{"d":"AI voice agent platform for healthcare communication and patient engagement automation."},"Paratus Health":{"d":"Healthcare AI company automating patient outreach and engagement through voice technology."},"MayaMD.AI":{"d":"AI-powered clinical decision support and patient triage platform with voice capabilities."},"Popai Health":{"d":"AI-driven patient engagement platform for healthcare providers."},"Tabia Health":{"d":"Voice AI platform for proactive patient engagement and healthcare communication."},"Cairns Health":{"d":"AI-powered healthcare engagement platform for patient communication and follow-up."},"Luma Health":{"d":"AI-powered patient engagement and scheduling platform for healthcare organizations."},"Verbal":{"d":"AI-powered communication analytics platform for healthcare conversations."},"Areti Health":{"d":"Healthcare AI platform for patient engagement and clinical communication automation."},"VoiceSpin":{"d":"AI-powered contact center solution with voice agent capabilities for healthcare."},"Callsure AI":{"d":"AI call management and voice agent platform for healthcare providers."},"Phelix.ai":{"d":"AI-powered healthcare communication platform automating patient interactions."},"Prodoc AI":{"d":"AI-powered clinical documentation and patient engagement platform."},"Alden":{"d":"Healthcare AI company focused on patient engagement and voice-driven care coordination."},"Cadence":{"d":"Remote patient monitoring and chronic care management with AI-driven patient engagement."},"Lifelink Systems":{"d":"Healthcare communication platform with AI-powered patient engagement and messaging."},"Artera":{"d":"Patient communications platform orchestrating multi-channel healthcare engagement with AI."},"Syllable AI":{"d":"AI-powered patient access platform automating healthcare call centers and scheduling."},"Infinitus Systems":{"d":"AI-powered phone agent platform automating healthcare administrative calls at scale.","t":["$55M funding"]},"SuperDial":{"d":"AI platform automating healthcare phone calls for insurance verification and prior authorization."},"Hello Patient":{"d":"AI-powered patient communication and engagement platform for healthcare practices."},"Talkie.ai":{"d":"Conversational AI platform with voice agents for healthcare appointment scheduling and patient access."},"Heidi":{"d":"AI-powered clinical documentation assistant for healthcare providers."},"Operator Labs":{"d":"AI-powered healthcare operations platform automating patient scheduling and communication."},"Parakeet Health":{"d":"AI voice agent platform for healthcare patient access and administrative automation."},"Callin.io":{"d":"AI voice platform with white-label customizable voice agents for healthcare and enterprise; HIPAA compliant.","t":["8 employees"]},"VINSI.AI":{"d":"AI-powered voice agent SaaS platform with healthcare-specific deployments and demonstrations.","t":["8 employees","Founded 2023"]},"Caretalk":{"d":"AI call-center agent for healthcare enabling human-like conversations and appointment scheduling.","t":["Founded 2023"]},"Gong":{"d":"Revenue AI platform that analyzes customer interactions to generate insights for sales teams.","t":["$583.5M revenue","1800 employees"]},"Dialo":{"d":"AI-powered sales engagement platform with voice agent capabilities for revenue teams."},"PolyAI":{"d":"Enterprise voice AI for contact centers, handling complex customer conversations autonomously.","t":["$120M funding"]},"Observe.AI":{"d":"AI-powered conversation intelligence platform for contact centers with real-time agent assistance.","t":["$214M funding"]},"ASAPP":{"d":"AI-native platform for contact centers combining automation and agent augmentation.","t":["$380M funding"]},"Cresta":{"d":"AI platform for contact centers providing real-time coaching and conversation intelligence.","t":["$151M funding"]},"Decagon":{"d":"AI-powered customer support platform with voice and chat agent automation."},"Aisera":{"d":"Enterprise AI platform for IT, HR, and customer service with voice and conversational capabilities.","t":["$190M funding"]},"Maven AGI":{"d":"AI-powered customer support platform with autonomous voice and chat agent capabilities."},"Tovie AI":{"d":"Enterprise voice AI solutions including custom chatbots, voice bots, and generative AI agents.","t":["10 employees"]},"Loris":{"d":"AI-powered customer experience platform with conversation intelligence and quality assurance."},"Sanas":{"d":"Real-time accent translation technology for contact centers and global communications.","t":["$75M funding"]},"DeepL":{"d":"AI-powered translation platform with neural machine translation for 30+ languages.","t":["$100M funding","800 employees"]},"CAMB.AI":{"d":"AI localization platform specializing in speech synthesis and translation with voice cloning.","t":["$19.3M funding","48 employees"]},"Nagish":{"d":"Real-time AI-powered phone call captioning for people with hearing loss.","t":["$17M funding","35 employees","Founded 2021"]},"VocaliD":{"d":"AI voice technology creating personalized synthetic voices for assistive communication."},"Deepgram":{"d":"Specializing in voice AI solutions, including speech-to-text, text-to-speech, and conversational AI platforms.","t":["$233.3M funding","$24.2M revenue","208 employees","San Francisco"]},"AssemblyAI":{"d":"AI speech recognition platform offering accurate transcription, summarization, and audio intelligence APIs.","t":["$115M funding"]},"Floatbot.AI":{"d":"Conversational AI platform with voice and chat bots for enterprise automation."},"Parlance":{"d":"AI-powered voice solutions for healthcare and enterprise call routing and automation."},"Whissle AI":{"d":"Speech-to-text and voice AI platform for accurate transcription and audio analysis."},"Aqua Voice":{"d":"AI-powered voice-to-text platform for efficient speech recognition and transcription."},"Puretalk.ai":{"d":"Voice AI platform with speech recognition and conversational capabilities."},"Healthsync AI":{"d":"Healthcare-focused speech-to-text and clinical documentation AI platform."},"OmniSpeech LLC":{"d":"AI speech processing company specializing in noise suppression, voice clarity, and deepfake detection.","t":["$2.1M revenue","3 employees","Founded 2009"]}};

function CompanyDetail({ company, onClose }) {
  if (!company) return null;
  const domain = company.u.replace(/https?:\/\//, "").replace(/\/$/, "");
  const info = ENRICHED[company.n] || {};
  const tags = info.t || [];
  const desc = info.d || "";
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(26,26,46,0.4)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center",
      backdropFilter: "blur(2px)",
    }} onClick={onClose}>
      <div style={{
        background: "#F5F3F0", maxWidth: 480, width: "90%", padding: "36px 32px",
        borderRadius: "2px", boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <h3 style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontSize: "22px", color: "#1A1A2E", margin: 0, fontWeight: "normal",
          }}>{company.n}</h3>
          <button onClick={onClose} style={{
            background: "none", border: "none", cursor: "pointer", padding: 4,
          }}><Icon type="close" color="#8A8A9E" /></button>
        </div>
        <div style={{
          width: 40, height: 1, background: "#4A7BA7", margin: "14px 0 16px",
        }} />
        {desc && (
          <p style={{
            fontFamily: "'Calibri', 'Helvetica Neue', sans-serif",
            fontSize: "13.5px", color: "#5A5A72", lineHeight: 1.6,
            margin: "0 0 16px",
          }}>{desc}</p>
        )}
        {tags.length > 0 && (
          <div style={{
            display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16,
          }}>
            {tags.map((tag, i) => (
              <span key={i} style={{
                fontFamily: "'Calibri', sans-serif",
                fontSize: "11.5px", color: "#4A7BA7",
                background: "#E8EDF2", padding: "4px 10px",
                borderRadius: "2px", letterSpacing: "0.3px",
              }}>{tag}</span>
            ))}
          </div>
        )}
        <a href={company.u} target="_blank" rel="noopener noreferrer" style={{
          fontFamily: "'Calibri', 'Helvetica Neue', sans-serif",
          fontSize: "13px", color: "#4A7BA7", textDecoration: "none",
          display: "inline-flex", alignItems: "center", gap: 5,
        }}>
          {domain} <Icon type="external" color="#4A7BA7" />
        </a>
      </div>
    </div>
  );
}

function BucketSection({ name, companies, layerColor, searchTerm, onCompanyClick }) {
  const filtered = searchTerm
    ? companies.filter(c => c.n.toLowerCase().includes(searchTerm.toLowerCase()))
    : companies;

  if (searchTerm && filtered.length === 0) return null;

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 8, marginBottom: 10,
      }}>
        <Icon type={BUCKET_ICONS[name]} size={16} color={layerColor} />
        <span style={{
          fontFamily: "'Calibri', 'Helvetica Neue', sans-serif",
          fontSize: "11px", color: "#8A8A9E", textTransform: "uppercase",
          letterSpacing: "1.5px", fontWeight: 600,
        }}>{name}</span>
        <span style={{
          fontFamily: "'Georgia', serif",
          fontSize: "11px", color: layerColor, marginLeft: 2,
        }}>{filtered.length}</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", margin: "-3px" }}>
        {filtered.map((c, i) => (
          <CompanyPill
            key={i}
            company={c}
            isHighlighted={searchTerm && c.n.toLowerCase().includes(searchTerm.toLowerCase())}
            onClick={() => onCompanyClick(c)}
          />
        ))}
      </div>
    </div>
  );
}

function LayerSection({ layer, searchTerm, onCompanyClick }) {
  const buckets = DATA[layer.key] || {};
  const orderedBuckets = layer.bucketOrder.filter(b => buckets[b]);

  const visibleBuckets = searchTerm
    ? orderedBuckets.filter(b => buckets[b].some(c => c.n.toLowerCase().includes(searchTerm.toLowerCase())))
    : orderedBuckets;

  if (searchTerm && visibleBuckets.length === 0) return null;

  const layerTotal = orderedBuckets.reduce((sum, b) => sum + (buckets[b]?.length || 0), 0);

  return (
    <div style={{
      marginBottom: 48,
      background: layer.bgColor,
      padding: "36px 32px 20px",
      borderLeft: `3px solid ${layer.color}`,
    }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{
          display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6,
        }}>
          <h2 style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontSize: "26px", color: "#1A1A2E", margin: 0, fontWeight: "normal",
          }}>{layer.label}</h2>
          <span style={{
            fontFamily: "'Georgia', serif",
            fontSize: "20px", color: layer.color,
          }}>{layerTotal}</span>
        </div>
        <p style={{
          fontFamily: "'Calibri', 'Helvetica Neue', sans-serif",
          fontSize: "14px", color: "#5A5A72", margin: 0, lineHeight: 1.5,
          maxWidth: 640,
        }}>{layer.tagline}</p>
        <div style={{
          width: "100%", height: 1, background: "#D0D0DC", marginTop: 16,
        }} />
      </div>
      {visibleBuckets.map((bucketName) => (
        <BucketSection
          key={bucketName}
          name={bucketName}
          companies={buckets[bucketName]}
          layerColor={layer.color}
          searchTerm={searchTerm}
          onCompanyClick={onCompanyClick}
        />
      ))}
    </div>
  );
}

function StatBlock({ number, label, sublabel }) {
  return (
    <div style={{ textAlign: "center", flex: 1, padding: "0 16px" }}>
      <div style={{
        fontFamily: "'Georgia', serif", fontSize: "42px",
        color: "#4A7BA7", lineHeight: 1, marginBottom: 6,
      }}>{number}</div>
      <div style={{
        fontFamily: "'Calibri', sans-serif", fontSize: "12px",
        color: "#1A1A2E", textTransform: "uppercase", letterSpacing: "1px",
        fontWeight: 600,
      }}>{label}</div>
      {sublabel && <div style={{
        fontFamily: "'Calibri', sans-serif", fontSize: "11px",
        color: "#8A8A9E", marginTop: 3,
      }}>{sublabel}</div>}
    </div>
  );
}

export default function StateOfVoiceAI() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredLayers = useMemo(() => {
    if (activeFilter === "all") return LAYERS;
    return LAYERS.filter(l => l.key === activeFilter);
  }, [activeFilter]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F5F3F0",
      color: "#1A1A2E",
    }}>
      {/* Header */}
      <header style={{
        padding: "48px 32px 0",
        maxWidth: 960,
        margin: "0 auto",
      }}>
        <div style={{
          fontFamily: "'Calibri', 'Helvetica Neue', sans-serif",
          fontSize: "11px", color: "#8A8A9E",
          textTransform: "uppercase", letterSpacing: "2px",
          marginBottom: 16,
        }}>
          Published by Hana Health &nbsp;·&nbsp; April 2026
        </div>

        <h1 style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontSize: "clamp(32px, 5vw, 52px)",
          fontWeight: "normal",
          lineHeight: 1.1,
          color: "#1A1A2E",
          margin: "0 0 16px",
          maxWidth: 700,
        }}>
          The State of Voice AI<br />in Healthcare
        </h1>

        <div style={{
          width: 60, height: 2, background: "#4A7BA7",
          margin: "0 0 20px",
        }} />

        <p style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontSize: "18px",
          lineHeight: 1.6,
          color: "#5A5A72",
          maxWidth: 580,
          margin: "0 0 12px",
        }}>
          247 companies. Three layers of infrastructure. One map to make sense of it all.
        </p>

        <p style={{
          fontFamily: "'Calibri', 'Helvetica Neue', sans-serif",
          fontSize: "14px",
          lineHeight: 1.7,
          color: "#8A8A9E",
          maxWidth: 560,
          margin: "0 0 40px",
        }}>
          Voice AI in healthcare has exploded, but the landscape is fragmented and hard to navigate. This is the first comprehensive mapping of the entire ecosystem — from the foundational models that understand speech, to the platforms that orchestrate agents, to the applications that engage patients. Whether you are a clinic evaluating vendors, an investor mapping the space, or a builder choosing your stack, this is your reference.
        </p>
      </header>

      {/* Stats Bar */}
      <div style={{
        maxWidth: 960, margin: "0 auto 40px", padding: "0 32px",
      }}>
        <div style={{
          display: "flex", justifyContent: "space-around",
          background: "#1A1A2E", padding: "28px 16px",
          borderRadius: "2px",
        }}>
          <StatBlock number="247" label="Companies Mapped" />
          <div style={{ width: 1, background: "#3A3A52" }} />
          <StatBlock number="75" label="Infrastructure" sublabel="Core voice tech" />
          <div style={{ width: 1, background: "#3A3A52" }} />
          <StatBlock number="44" label="Platforms" sublabel="Agent orchestration" />
          <div style={{ width: 1, background: "#3A3A52" }} />
          <StatBlock number="128" label="Applications" sublabel="Patient-facing" />
        </div>
      </div>

      {/* Search + Filters */}
      <div style={{
        maxWidth: 960, margin: "0 auto 32px", padding: "0 32px",
      }}>
        <div style={{
          display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap",
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "#FFFFFF", border: "1px solid #D0D0DC",
            padding: "8px 14px", flex: "1 1 280px", maxWidth: 360,
            borderRadius: "2px",
          }}>
            <Icon type="search" size={16} color="#8A8A9E" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: "none", outline: "none", background: "transparent",
                fontFamily: "'Calibri', sans-serif", fontSize: "14px",
                color: "#1A1A2E", width: "100%",
              }}
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} style={{
                background: "none", border: "none", cursor: "pointer", padding: 2,
              }}><Icon type="close" size={14} color="#8A8A9E" /></button>
            )}
          </div>

          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {[
              { key: "all", label: "All Layers" },
              { key: "Core Voice Infrastructure", label: "Infrastructure" },
              { key: "Voice Agent Platforms", label: "Platforms" },
              { key: "Engagement Applications", label: "Applications" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                style={{
                  fontFamily: "'Calibri', sans-serif",
                  fontSize: "12px",
                  padding: "6px 14px",
                  border: activeFilter === key ? "1px solid #4A7BA7" : "1px solid #D0D0DC",
                  background: activeFilter === key ? "#4A7BA7" : "transparent",
                  color: activeFilter === key ? "#FFFFFF" : "#5A5A72",
                  cursor: "pointer",
                  borderRadius: "2px",
                  letterSpacing: "0.5px",
                  transition: "all 0.15s ease",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Narrative: How to Read This Map */}
      <div style={{
        maxWidth: 960, margin: "0 auto 40px", padding: "0 32px",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}>
          {LAYERS.map((layer) => {
            const count = Object.values(DATA[layer.key] || {}).reduce((s, c) => s + c.length, 0);
            return (
              <div key={layer.key} style={{
                padding: "20px 18px",
                borderTop: `2px solid ${layer.color}`,
                background: "#FFFFFF",
              }}>
                <div style={{
                  fontFamily: "'Georgia', serif", fontSize: "13px",
                  color: layer.color, marginBottom: 4,
                }}>Layer {LAYERS.indexOf(layer) + 1}</div>
                <div style={{
                  fontFamily: "'Georgia', serif", fontSize: "16px",
                  color: "#1A1A2E", marginBottom: 8, lineHeight: 1.3,
                }}>{layer.label}</div>
                <div style={{
                  fontFamily: "'Calibri', sans-serif", fontSize: "12.5px",
                  color: "#8A8A9E", lineHeight: 1.5,
                }}>{layer.tagline}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* The Map */}
      <div style={{
        maxWidth: 960, margin: "0 auto", padding: "0 32px 40px",
      }}>
        <div style={{
          fontFamily: "'Calibri', sans-serif", fontSize: "10px",
          color: "#8A8A9E", textTransform: "uppercase", letterSpacing: "2px",
          marginBottom: 20,
        }}>
          The Ecosystem Map
        </div>

        {filteredLayers.map((layer) => (
          <LayerSection
            key={layer.key}
            layer={layer}
            searchTerm={searchTerm}
            onCompanyClick={setSelectedCompany}
          />
        ))}
      </div>

      {/* Key Observations */}
      <div style={{
        maxWidth: 960, margin: "0 auto", padding: "0 32px 48px",
      }}>
        <div style={{
          background: "#1A1A2E", padding: "40px 36px", borderRadius: "2px",
        }}>
          <div style={{
            fontFamily: "'Calibri', sans-serif", fontSize: "10px",
            color: "#9BA4B0", textTransform: "uppercase", letterSpacing: "2px",
            marginBottom: 12,
          }}>Key Observations</div>
          <h3 style={{
            fontFamily: "'Georgia', serif", fontSize: "22px",
            color: "#E8EDF2", fontWeight: "normal", margin: "0 0 20px",
          }}>What the map reveals</h3>
          <div style={{
            width: "100%", height: 1, background: "#3A3A52", marginBottom: 24,
          }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px 40px" }}>
            {[
              {
                title: "The engagement layer is crowded — and undifferentiated",
                body: "107 companies in healthcare engagement and patient access alone. Most are thin application wrappers around the same infrastructure. The question for clinics isn't 'which one?' — it's 'which architecture?'",
              },
              {
                title: "Infrastructure is consolidating",
                body: "The TTS and STT layers are maturing around a handful of well-funded players. ElevenLabs, Deepgram, AssemblyAI are becoming the default primitives. The competitive advantage has moved up the stack.",
              },
              {
                title: "The platform layer is the strategic bottleneck",
                body: "Only 44 companies in the orchestration and telephony layer — yet this is where the real complexity lives. How you route, fallback, and maintain memory across conversations is what separates a demo from a deployment.",
              },
              {
                title: "Healthcare-native voice AI barely exists",
                body: "Most 'healthcare voice AI' companies are horizontal platforms with a healthcare landing page. Very few have built from the ground up for clinical workflows, safety, and compliance.",
              },
            ].map(({ title, body }, i) => (
              <div key={i}>
                <div style={{
                  fontFamily: "'Georgia', serif", fontSize: "14px",
                  color: "#B8CDE0", marginBottom: 8, lineHeight: 1.4,
                }}>{title}</div>
                <div style={{
                  fontFamily: "'Calibri', sans-serif", fontSize: "13px",
                  color: "#9BA4B0", lineHeight: 1.6,
                }}>{body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        maxWidth: 960, margin: "0 auto", padding: "32px 32px 48px",
        borderTop: "1px solid #D0D0DC",
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          flexWrap: "wrap", gap: 20,
        }}>
          <div>
            <div style={{
              fontFamily: "'Georgia', serif", fontSize: "18px",
              color: "#1A1A2E", marginBottom: 6,
            }}>hana</div>
            <div style={{
              fontFamily: "'Calibri', sans-serif", fontSize: "12px",
              color: "#8A8A9E", lineHeight: 1.6, maxWidth: 320,
            }}>
              Voice AI infrastructure for healthcare. Built to help, not extract.
            </div>
          </div>
          <div style={{
            fontFamily: "'Calibri', sans-serif", fontSize: "11px",
            color: "#8A8A9E", textAlign: "right",
          }}>
            <div>The State of Voice AI in Healthcare — 2026</div>
            <div style={{ marginTop: 4 }}>Data compiled from public sources, April 2026</div>
            <div style={{ marginTop: 4 }}>
              <a href="https://hana.health" target="_blank" rel="noopener noreferrer" style={{
                color: "#4A7BA7", textDecoration: "none",
              }}>hana.health</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Company Detail Modal */}
      {selectedCompany && (
        <CompanyDetail
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
        />
      )}
    </div>
  );
}