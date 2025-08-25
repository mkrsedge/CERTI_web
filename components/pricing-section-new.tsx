'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export function PricingSection() {
  const [userCount, setUserCount] = useState(20)

  const comparisonFeatures = [
    {
      category: "Document Management (DocCore)",
      subtitle: "Core document control and management capabilities",
      features: [
        { text: "Centralized Document Management", lite: true, standard: true, fullqms: true },
        { text: "Version Control & Approval Workflow Management", lite: true, standard: true, fullqms: true },
        { text: "Document Change Management & Impact Analysis", lite: true, standard: true, fullqms: true },
        { text: "AI-Based Document Change Recommendations", lite: true, standard: true, fullqms: true },
        { text: "Document Validity Management", lite: true, standard: true, fullqms: true },
        { text: "Document-Standard Compliance Management", lite: true, standard: true, fullqms: true },
        { text: "Business Intelligence & Analytics (Dashboard)", lite: true, standard: true, fullqms: true },
        { text: "Automatic Alerts & Notifications", lite: true, standard: true, fullqms: true }
      ]
    },
    {
      category: "Audit & CAPA Management",
      subtitle: "Advanced audit and corrective action capabilities",
      features: [
        { text: "Internal and External Audit Management", standard: true, fullqms: true },
        { text: "Real-Time Mobile Audit Interface", standard: true, fullqms: true },
        { text: "Production Line Error Management", standard: true, fullqms: true },
        { text: "AI-Based Audit Gap Detection and Management", standard: true, fullqms: true },
        { text: "AI-Based Pre-Audits", standard: true, fullqms: true },
        { text: "AI-Based Audit Reporting", standard: true, fullqms: true },
        { text: "AI-Based Root Cause Analysis", standard: true, fullqms: true },
        { text: "AI-Based Corrective and Preventive Action (CAPA) Recommendations", standard: true, fullqms: true },
        { text: "Customer Complaint Management", standard: true, fullqms: true },
        { text: "AI-Assisted Customer Complaint CAPA Reports", standard: true, fullqms: true }
      ]
    },
    {
      category: "Supplier & Training Management",
      subtitle: "Comprehensive supplier quality and workforce management",
      features: [
        { text: "Centralized Supplier Quality & Certificate Management", fullqms: true },
        { text: "AI-Based Supplier Scoring System", fullqms: true },
        { text: "Supplier Performance Analysis & Dashboard", fullqms: true },
        { text: "AI-Based Supplier Risk Assessment", fullqms: true },
        { text: "Employee Training & Certification Management", fullqms: true },
        { text: "AI-Based Training Recommendations", fullqms: true },
        { text: "Regulation-Focused Certificate Validity Tracking", fullqms: true }
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
          {/* Lite Card */}
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

          {/* Standard Card */}
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

          {/* Full QMS Card */}
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
          <p className="text-gray-600 text-center mb-12">Detailed feature comparison across all CERTI bundles</p>
          
          {/* Comparison Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-4 bg-gray-50 border-b border-gray-200">
              <div className="p-4"></div>
              <div className="p-4 text-center font-medium text-gray-900">Lite</div>
              <div className="p-4 text-center font-medium text-gray-900">Standard</div>
              <div className="p-4 text-center font-medium text-gray-900">Full QMS</div>
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
                    if (feature.all) return true
                    if (feature.status) return feature.status
                    if (plan === 'lite' && feature.lite !== undefined) return feature.lite
                    if (plan === 'standard' && feature.standard !== undefined) return feature.standard
                    if (plan === 'fullqms' && feature.fullqms !== undefined) return feature.fullqms
                    return false
                  }

                  return (
                    <div key={featureIndex} className="grid grid-cols-4 border-b border-gray-100 text-sm">
                      <div className="p-4 text-gray-700">{featureText}</div>
                      <div className="p-4 text-center">
                        {isIncluded('lite') === true ? '✓' : 
                         typeof isIncluded('lite') === 'string' ? isIncluded('lite') : ''}
                      </div>
                      <div className="p-4 text-center">
                        {isIncluded('standard') === true ? '✓' : 
                         typeof isIncluded('standard') === 'string' ? isIncluded('standard') : ''}
                      </div>
                      <div className="p-4 text-center">
                        {isIncluded('fullqms') === true ? '✓' : 
                         typeof isIncluded('fullqms') === 'string' ? isIncluded('fullqms') : ''}
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
