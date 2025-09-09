'use client'

import { motion } from 'framer-motion'

export function PricingSection() {
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
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Choose Your CERTI Plan
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Start with the essentials and scale up as you grow. All plans include our core AI-powered quality management features.
          </motion.p>
        </div>

        {/* Unified Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
        >
          {/* Card Header */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-12 text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Transparent Pricing</h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Get personalized pricing based on your organization's size and requirements
            </p>
          </div>

          {/* Plans Overview */}
          <div className="p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Lite Plan */}
              <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Lite</h3>
                <p className="text-gray-600">Core document control</p>
                </div>
              </div>

              {/* Standard Plan */}
              <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                  <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Standard</h3>
                <p className="text-gray-600">Audits + CAPA</p>
                </div>
              </div>

              {/* Full QMS Plan */}
              <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-200 transition-colors">
                  <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Full QMS</h3>
                <p className="text-gray-600">End-to-end quality</p>
                </div>
              </div>
            </div>

            {/* CTA Inside Card */}
            <div className="text-center">
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h4>
              <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                Get personalized pricing and see which plan is perfect for your organization
              </p>
              <button className="bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white font-bold py-4 px-12 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                Get Pricing
              </button>
            </div>
          </div>
        </motion.div>

        {/* Compare Plans Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16 mb-20"
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
                    if (plan === 'lite' && 'lite' in feature) return feature.lite
                    if (plan === 'standard' && 'standard' in feature) return feature.standard
                    if (plan === 'fullqms' && 'fullqms' in feature) return feature.fullqms
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
                         typeof isIncluded('standard') === 'string' ? isIncluded('fullqms') : ''}
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Need a Custom Solution?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We can tailor a plan specifically for your organization's unique requirements and scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gray-900 text-white font-semibold py-3 px-8 rounded-xl hover:bg-gray-800 transition-colors">
                Contact Sales
              </button>
              <button className="border-2 border-gray-900 text-gray-900 font-semibold py-3 px-8 rounded-xl hover:bg-gray-900 hover:text-white transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

