'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export function CaseStudiesSection() {
  const [expandedModule, setExpandedModule] = useState<number | null>(null)

  const modules = [
    {
      number: '01',
      title: 'DOCCORE',
      subtitle: 'Documents, always audit-ready',
      description: 'Intelligent document control & change management.',
      published: 'AUG 2024',
      fullDescription: 'Stop guessing what each change touches. DocCore links every quality document to the clause it supports—then tracks versions, approvals, and compliance impact in one trail.',
      features: ['Clause-aware document mapping & gap surfacing', 'Smart change requests with impact hints (linked procedures, training)', 'Role-based approvals and clean audit trails', 'Evidence attachments that stay in sync with revisions'],
      outcome: 'Faster revisions, fewer blind spots, clean proofs.'
    },
    {
      number: '02',
      title: 'AUDITCORE',
      subtitle: 'Nail every audit on the first try',
      description: 'Mobile audits, AI pre-checks, live readiness.',
      published: 'SEP 2024',
      fullDescription: 'Run mobile audits with your own templates, generate findings in real time, and see live clause coverage that tells you exactly what\'s ready and what\'s not—before the auditor does.',
      features: ['Customizable checklists and mobile capture', 'AI pre-checks that flag likely non-conformances', 'Live clause coverage dashboard', 'One-click evidence packets you can hand to auditors'],
      outcome: 'Prep in hours, not weeks.'
    },
    {
      number: '03',
      title: 'RESOLVECORE',
      subtitle: 'Fix issues before they become real problems',
      description: 'AI-drafted CAPAs, RCA, verification.',
      published: 'OCT 2024',
      fullDescription: 'Turn issues and customer complaints into lasting fixes. ResolveCore guides root-cause analysis, drafts corrective and preventive actions from your procedures, and verifies effectiveness—so problems don\'t come back.',
      features: ['Root-Cause Analysis guidance (e.g., 5-Whys)', 'AI-assisted CAPAs linked to SOPs and forms', 'Effectiveness checks with due-date nudges', 'Trend analysis to watch repeat risks'],
      outcome: 'Measurably fewer repeat findings and faster resolutions.'
    },
    {
      number: '04',
      title: 'SUPPLYCORE',
      subtitle: 'No more surprises from suppliers.',
      description: 'Supplier onboarding, docs, non-conformances.',
      published: 'NOV 2024',
      fullDescription: 'Centralize approvals, specs, and certificates. Get nudges before expiries, log non-conformances, and route issues straight into CAPA—so your line never learns about a supplier problem the hard way.',
      features: ['Expiry tracking for certs & specs', 'Supplier scoring and performance dashboards (on-time docs, incidents, trendlines)', 'Supplier incidents to CAPA handoff', 'Onboarding workflows and doc collection'],
      outcome: 'Reliable supply chain, stronger audits.'
    },
    {
      number: '05',
      title: 'SKILLCORE',
      subtitle: 'Workforce compliance on autopilot',
      description: 'Workforce training, skills & certifications on autopilot.',
      published: 'DEC 2024',
      fullDescription: 'When a certification or training is required, SkillCore auto-suggests the right actions by role and site, nudges completion, and maintains a clean, exportable trail—so workforce compliance never falls behind.',
      features: ['Centralized credentials, training records, and attestations with fast search', 'Expiry tracking and renewals with notifications to employees & supervisors', 'Auto-assignments from SOP changes and CAPA actions with due-date rules', 'Role/site coverage matrix with gap alerts and escalating reminders'],
      outcome: 'Fewer training-related findings, zero-surprise expiries, audit-ready records.'
    }
  ]

  return (
    <section id="case-studies" className="min-h-screen bg-white px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-light text-black mb-6">
            CORE MODULES
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive suite of modules designed to address every aspect of your business operations and growth.
          </p>
        </motion.div>

        {/* Module Sections */}
        <div className="space-y-12">
          {modules.map((module, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {/* Clear Background Container with Dark Brown Border */}
              <div className="bg-white rounded-3xl border-4 p-8 md:p-12 relative overflow-hidden" style={{borderColor: '#3e2723'}}>
                {/* Module Header Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left Section - Number and Content */}
                  <div className="lg:col-span-8">
                    <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 mb-6">
                      {/* Large Number */}
                      <div className="text-6xl md:text-8xl font-bold leading-none" style={{color: '#3e2723'}}>
                        {module.number}
                      </div>
                      
                      {/* Title */}
                      <div className="flex-1">
                        <h3 className="text-3xl md:text-5xl font-bold leading-tight mb-4 uppercase tracking-wide" style={{color: '#3e2723'}}>
                          {module.title}
                        </h3>
                        

                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-lg md:text-xl leading-relaxed max-w-3xl" style={{color: '#3e2723'}}>
                      {module.description}
                    </p>
                  </div>

                  {/* Right Section - Open It Button */}
                  <div className="lg:col-span-4 flex justify-end">
                    <button
                      onClick={() => setExpandedModule(expandedModule === index ? null : index)}
                      className="px-8 py-4 font-bold text-xl transition-colors uppercase tracking-wide rounded-full shadow-lg"
                      style={{backgroundColor: '#ffedac', color: '#3e2723'}}
                    >
                      DETAILS
                    </button>
                  </div>
                </div>


              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedModule === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="overflow-hidden mt-8"
                  >
                    <div className="bg-white rounded-3xl border-4 p-8 md:p-12 shadow-lg" style={{borderColor: '#3e2723'}}>
                      <h4 className="text-3xl font-bold mb-6 uppercase tracking-wide" style={{color: '#3e2723'}}>
                        {module.subtitle}
                      </h4>
                      
                      <p className="text-lg text-gray-700 leading-relaxed mb-8">
                        {module.fullDescription}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h5 className="text-xl font-bold mb-6 uppercase tracking-wide" style={{color: '#3e2723'}}>Key Capabilities:</h5>
                          <ul className="space-y-3">
                            {module.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-start gap-3">
                                <div className="w-3 h-3 rounded-full mt-1 flex-shrink-0" style={{backgroundColor: '#3e2723'}}></div>
                                <span className="text-gray-700 text-base leading-relaxed">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="p-6 rounded-2xl border-2" style={{backgroundColor: '#fdf9f3', borderColor: '#d4c4b0'}}>
                          <h5 className="text-xl font-bold mb-6 uppercase tracking-wide" style={{color: '#3e2723'}}>Outcome</h5>
                          <p className="text-gray-700 text-base leading-relaxed font-medium">{module.outcome}</p>
                          
                          <div className="mt-6 pt-4 border-t" style={{borderColor: '#d4c4b0'}}>
                            <div className="flex justify-between">
                              <span className="font-medium uppercase tracking-wide text-sm" style={{color: '#6b4c3a'}}>Module:</span>
                              <span className="text-gray-700 text-sm">{module.number}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-gray-200 flex justify-center">
                        <button
                          onClick={() => setExpandedModule(null)}
                          className="px-8 py-3 font-bold text-lg transition-colors uppercase tracking-wide rounded-full shadow-lg"
                          style={{backgroundColor: '#ffedac', color: '#3e2723'}}
                        >
                          ← Close Details
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
