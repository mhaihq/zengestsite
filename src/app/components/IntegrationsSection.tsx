import React from 'react';

export function IntegrationsSection() {
  return (
    <section className="relative py-24 px-8 overflow-hidden bg-[#00122F] text-white">
       {/* Ambient glow */}
       <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(59,130,246,0.15)_0%,transparent_70%)] pointer-events-none z-0" />

       <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.08em] uppercase text-blue-400 mb-6
              before:content-[''] before:w-6 before:h-px before:bg-blue-400 before:opacity-40
              after:content-[''] after:w-6 after:h-px after:bg-blue-400 after:opacity-40
            ">
              Integrations
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] text-white mb-5 tracking-tight">
              One integration. <em className="italic text-blue-400">Every workflow.</em>
            </h2>
            <p className="text-lg leading-[1.65] text-slate-300 max-w-2xl mx-auto font-normal">
              Hana connects to your clinical systems, reaches patients on any channel, and works with whatever tech stack you have or don't have.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* Pillar 1 */}
             <div className="relative bg-white/5 border border-white/10 rounded-[20px] p-10 pt-10 pb-9 overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-white/10 group">
                
                <div className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center mb-7 bg-blue-500/10 border border-blue-500/20 text-blue-400">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                   </svg>
                </div>
                
                <h3 className="text-[26px] font-normal text-white mb-3 tracking-[-0.01em]">Plugs into your systems</h3>
                <p className="text-[15px] leading-[1.7] text-slate-400 mb-8 font-normal">
                  Direct integrations with major EHRs. Or connect through Redox and Catagon to reach 95+ systems. Hana reads the chart, engages the patient, and writes structured notes back.
                </p>
                
                <div className="flex flex-wrap gap-[10px]">
                   {["Athena Health", "Charm", "Practice Q", "Redox", "Catagon", "95+ EHRs"].map(item => (
                     <span key={item} className="inline-flex items-center gap-[7px] px-[14px] py-[7px] rounded-lg bg-white/5 border border-white/10 text-[13px] font-medium text-slate-300 transition-colors hover:bg-white/10 hover:border-white/20 tracking-[0.01em]">
                       <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-blue-400"></span>
                       {item}
                     </span>
                   ))}
                </div>
             </div>

             {/* Pillar 2 */}
             <div className="relative bg-white/5 border border-white/10 rounded-[20px] p-10 pt-10 pb-9 overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-white/10 group">
                
                <div className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center mb-7 bg-blue-500/10 border border-blue-500/20 text-blue-400">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                   </svg>
                </div>
                
                <h3 className="text-[26px] font-normal text-white mb-3 tracking-[-0.01em]">Reaches your patients</h3>
                <p className="text-[15px] leading-[1.7] text-slate-400 mb-8 font-normal">
                  Voice calls, SMS, WhatsApp, iMessage in 3+ languages. Hana picks the right channel, time, and tone for each patient. No app. No portal. No login. Just a conversation.
                </p>
                
                <div className="flex flex-wrap gap-[10px]">
                   {["Voice calls", "SMS", "WhatsApp", "iMessage", "3+ languages"].map(item => (
                     <span key={item} className="inline-flex items-center gap-[7px] px-[14px] py-[7px] rounded-lg bg-white/5 border border-white/10 text-[13px] font-medium text-slate-300 transition-colors hover:bg-white/10 hover:border-white/20 tracking-[0.01em]">
                       <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-blue-400"></span>
                       {item}
                     </span>
                   ))}
                </div>
             </div>

             {/* Pillar 3 */}
             <div className="relative bg-white/5 border border-white/10 rounded-[20px] p-10 pt-10 pb-9 overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-white/10 group">
                
                <div className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center mb-7 bg-blue-500/10 border border-blue-500/20 text-blue-400">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.049.58.025 1.194-.14 1.743" />
                   </svg>
                </div>
                
                <h3 className="text-[26px] font-normal text-white mb-3 tracking-[-0.01em]">Works even without an EHR</h3>
                <p className="text-[15px] leading-[1.7] text-slate-400 mb-8 font-normal">
                  No EHR integration? No problem. We build custom dashboards, standalone agent controls, or work alongside whatever you're using today. You don't need to be "tech-ready" to start.
                </p>
                
                <div className="flex flex-wrap gap-[10px]">
                   {["Custom dashboards", "Agent control panel", "Works alongside your tools", "No tech requirements"].map(item => (
                     <span key={item} className="inline-flex items-center gap-[7px] px-[14px] py-[7px] rounded-lg bg-white/5 border border-white/10 text-[13px] font-medium text-slate-300 transition-colors hover:bg-white/10 hover:border-white/20 tracking-[0.01em]">
                       <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-blue-400"></span>
                       {item}
                     </span>
                   ))}
                </div>
             </div>

          </div>

          {/* Bottom strip */}
          <div className="mt-16 text-center relative z-10">
             <div className="w-full h-px bg-white/10 mb-8" />
             <p className="text-[15px] text-slate-400 leading-relaxed font-normal">
               <strong className="text-white font-medium">Building a platform?</strong> Embed Hana via SDK and white-label it as your own. <a href="#" className="text-blue-400 no-underline border-b border-blue-400/30 hover:opacity-80 transition-opacity">Learn about partnerships →</a>
             </p>
          </div>
       </div>
    </section>
  )
}
