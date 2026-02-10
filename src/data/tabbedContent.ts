export interface Tab {
  id: string;
  label: string;
}

export interface TabContent {
  tagline: string;
  title: string;
  description: string;
  features: string[];
  image: string;
}

export const tabs: Tab[] = [
  { id: 'tab1', label: 'Outreach' },
  { id: 'tab2', label: 'Intake' },
  { id: 'tab3', label: 'Coordination' },
  { id: 'tab4', label: 'Monitoring' }
];

export const tabContent: Record<string, TabContent> = {
  tab1: {
    tagline: 'Patient Engagement',
    title: 'Bring patients back into care',
    description: 'Automated outreach campaigns that reconnect patients with their healthcare journey through personalized, compliant communication.',
    features: [
      'Reactivation campaigns',
      'Reminders & nudges',
      'HIPAA/TCPA compliant'
    ],
    image: 'https://wnvgvfmhzoyeotjczmys.supabase.co/storage/v1/object/public/hana/Illustration_icons%20only.png'
  },
  tab2: {
    tagline: 'Patient Onboarding',
    title: 'Streamline enrollment & assessment',
    description: 'Comprehensive intake process that captures essential patient information and baseline assessments efficiently.',
    features: [
      'Demographics & consents',
      'PHQ-9, GAD-7, pain, sleep',
      'Baseline + reassessments'
    ],
    image: 'https://wnvgvfmhzoyeotjczmys.supabase.co/storage/v1/object/public/new%20site/Illustration_intake%20flow%20diagram.png'
  },
  tab3: {
    tagline: 'Operational Excellence',
    title: 'Run clinic operations smoothly',
    description: 'Integrated workflow management that keeps your clinic running efficiently while reducing administrative burden.',
    features: [
      'Scheduling & no-show recovery',
      'Call routing & follow-ups',
      'Billing minutes & escalations'
    ],
    image: 'https://wnvgvfmhzoyeotjczmys.supabase.co/storage/v1/object/public/new%20site/Illustration_coordination%20flow%20diagram.png'
  },
  tab4: {
    tagline: 'Continuous Care',
    title: 'Continuous support between visits',
    description: 'Ongoing patient monitoring and support that bridges the gap between appointments with proactive interventions.',
    features: [
      'Weekly check-ins',
      'Coaching & adherence tracking',
      'Real-time risk alerts'
    ],
    image: 'https://wnvgvfmhzoyeotjczmys.supabase.co/storage/v1/object/public/new%20site/Illustration_monitoring%20flow%20simple%20circular.png'
  }
};
