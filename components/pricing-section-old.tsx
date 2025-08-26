'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export function PricingSection() {
  const [userCount, setUserCount] = useState(20)

  const comparisonFeatures = [
    {
      category: "Shields",
      subtitle: "Trustworthy AI architecture providing automatic quality checks",
      features: [
        "Quality, Hallucination, Confabulation checks on every query",
        "Supervisor agent checking adherence to instructions & output quality", 
        "Categorized Immutable Ledger of Used Sources",
        "Private Vault – per company database of private data"
      ]
    },
    {
      category: "Apps",
      subtitle: "Connect any Public, Team or Personal flows into apps with shared context",
      features: [
        "20+ ready-to-use Apps",
        "Zero prompting skills needed to run already created Apps",
        "Export in PDF",
        "Share via a Public Link",
        "Customize existing Apps and Create new ones",
        "Share context between all Flows in an App",
        "Chain Flows together via variables",
        "Run any Flow multiple times in parallel for different inputs",
        "Share templates with your colleagues"
      ]
    },
    {
      category: "Flows",
      subtitle: "Autonomous Agents collaborating on complex processes",
      features: [
        { text: "Zero prompting skills needed to run already created Flows", all: true },
        { text: "100+ ready-to-use Flows", all: true },
        { text: "Suggests follow up Questions based on context", all: true },
        { text: "Shows all Agent step-by-step actions, tool calls and Answers", all: true },
        { text: "Tracks and categorizes used sources + Inline citations", all: true },
        { text: "Export in PPTX, PDF", all: true },
        { text: "Share via a Public Link", all: true },
        { text: "Free built-in tools – Crunchbase API, Patents, Yfinance, News, Apify.com", all: true },
        { text: "Download any tables as CSV/XLS", all: true },
        { text: "Markdown export of any content", all: true },
        { text: "Visualization – mindmaps, charts and graphs", all: true },
        { text: "Agent Collaboration – passing work context among agents", all: true },
        { text: "Combine diverse datasets for analysis", all: true },
        { text: "Autopilot – schedule recurring runs into email", status: "Coming Soon" },
        { text: "Share templates with your colleagues", unlimited: true, enterprise: true },
        { text: "Customize existing Flows and Create new ones", unlimited: true, enterprise: true },
        { text: "Define variables for reusability", unlimited: true, enterprise: true },
        { text: "API for each Flow", unlimited: true, enterprise: true },
        { text: "Auto-generate agent prompting", unlimited: true, enterprise: true },
        { text: "Natural language agent editing", unlimited: true, enterprise: true },
        { text: "Autonomous agent training", enterprise: "On Demand" },
        { text: "Custom API connectors", enterprise: "On Demand" }
      ]
    },
    {
      category: "Datasets + Integrations", 
      subtitle: "Private per-company vector database and connections to outside services",
      features: [
        "Upload private data and utilize it in Answers, Flows and Apps",
        "Connect via API/MCP to outside databases",
        "Expand datasets automatically with sources from Flows and Apps",
        "Share datasets within a company",
        "Monday.com, Outlook (more expanding on demand)"
      ]
    },
    {
      category: "Answers",
      subtitle: "Get reliable answers from high-quality sources or your own data.",
      features: [
        "Quality, Hallucination, Confabulation checks on every question",
        "Query Datasets via chat",
        "Unlimited Questions"
      ]
    },
    {
      category: "Additional features",
      features: [
        { text: "Email support", unlimited: true, enterprise: true },
        { text: "SOC2-compliance", enterprise: true },
        { text: "Onboarding and training", enterprise: true },
        { text: "Login via SSO", enterprise: true },
        { text: "Professional service support", enterprise: "On Demand" },
        { text: "Tier-user access with audit log", enterprise: true },
        { text: "Weekly Office Hours", enterprise: "On Demand" },
        { text: "Custom AI work", unlimited: "On Demand", enterprise: "On Demand" }
      ]
    }
  ]

  return (
    <section className="min-h-screen bg-white px-6 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-normal text-gray-900 mb-4">
            Plans & Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pick the pace that fits your team.<br /><br />
            Transparent tiers that expand as you scale. Every plan includes secure hosting, custom AI access, and friendly onboarding.
          </p>
        </motion.div>

        {/* Main Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {/* Pay-as-you-go Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-white rounded-lg border border-gray-200 p-8"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Lite</h3>
            
            <div className="space-y-3 mb-8">
              <div className="text-sm text-gray-700">Document control + basic audits. For first-time QMS users getting organized.</div>
            </div>

            <button className="w-full bg-[#ff6935] hover:bg-[#e55a2e] text-white font-medium py-3 px-6 rounded transition-colors duration-200 text-sm">
              Get pricing
            </button>
          </motion.div>

          {/* Unlimited Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-lg border border-gray-200 p-8"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Standard</h3>
            
            <div className="space-y-3 mb-8">
              <div className="text-sm text-gray-700">Adds CAPA, audit assistance, live readiness. Most popular.</div>
            </div>

            <button className="w-full border border-gray-300 hover:border-gray-400 text-gray-900 font-medium py-3 px-6 rounded transition-colors duration-200 text-sm">
              Get pricing
            </button>
          </motion.div>

          {/* Enterprise Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-gray-900 rounded-lg p-8 text-white"
          >
            <h3 className="text-xl font-semibold mb-6">Full QMS</h3>
            
            <div className="space-y-3 mb-8">
              <div className="text-sm text-gray-300">End-to-end quality management on autopilot, supplier compliance, workforce certifications.</div>
            </div>

            <button className="w-full bg-white hover:bg-gray-100 text-gray-900 font-medium py-3 px-6 rounded transition-colors duration-200 text-sm">
              Get pricing
            </button>
          </motion.div>
        </div>

        {/* Compare Plans Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-normal text-gray-900 mb-4 text-center">Compare Plans</h2>
          <p className="text-gray-600 text-center mb-12">Unlimited and Enterprise plans include unlimited usage at a fixed per-user price</p>
          
          {/* Comparison Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-4 bg-gray-50 border-b border-gray-200">
              <div className="p-4"></div>
              <div className="p-4 text-center font-medium text-gray-900">Pay-As-You Go</div>
              <div className="p-4 text-center font-medium text-gray-900">Unlimited</div>
              <div className="p-4 text-center font-medium text-gray-900">Enterprise</div>
            </div>

            {/* Feature Categories */}
            {comparisonFeatures.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                {/* Category Header */}
                <div className="bg-gray-50 border-b border-gray-200 p-4">
                  <h4 className="font-semibold text-gray-900">{category.category}</h4>
                  {category.subtitle && (
                    <p className="text-sm text-gray-600 mt-1">{category.subtitle}</p>
                  )}
                </div>

                {/* Category Features */}
                {category.features.map((feature, featureIndex) => {
                  const featureText = typeof feature === 'string' ? feature : feature.text
                  const isIncluded = (plan: string) => {
                    if (typeof feature === 'string') return true
                    if (plan === 'unlimited' && 'unlimited' in feature) return feature.unlimited
                    if (plan === 'enterprise' && 'enterprise' in feature) return feature.enterprise
                    return false
                  }

                  return (
                    <div key={featureIndex} className="grid grid-cols-4 border-b border-gray-100 text-sm">
                      <div className="p-4 text-gray-700">{featureText}</div>
                      <div className="p-4 text-center">
                        {isIncluded('paygo') === true ? '✓' : 
                         typeof isIncluded('paygo') === 'string' ? isIncluded('paygo') : ''}
                      </div>
                      <div className="p-4 text-center">
                        {isIncluded('unlimited') === true ? '✓' : 
                         typeof isIncluded('unlimited') === 'string' ? isIncluded('unlimited') : ''}
                      </div>
                      <div className="p-4 text-center">
                        {isIncluded('enterprise') === true ? '✓' : 
                         typeof isIncluded('enterprise') === 'string' ? isIncluded('enterprise') : ''}
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </motion.div>


      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ff6935;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ff6935;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </section>
  )
}
