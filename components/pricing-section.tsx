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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Lite</h4>
                <p className="text-gray-600 mb-4">Essential document control and basic audit capabilities</p>
                <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg mb-3">
                  Perfect for small teams and startups
                </div>
                <div className="text-xs text-blue-600 font-medium bg-blue-50 p-2 rounded-lg">
                  Includes: DocCore Module
                </div>
                </div>
              </div>

              {/* Standard Plan */}
              <div className="bg-white rounded-2xl border-2 border-orange-200 p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="text-center">
                <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-colors">
                  <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Standard</h4>
                <p className="text-gray-600 mb-4">Advanced audit capabilities with AI-powered CAPA management</p>
                <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg mb-3">
                  Ideal for growing organizations
                </div>
                <div className="text-xs text-orange-600 font-medium bg-orange-50 p-2 rounded-lg">
                  Includes: DocCore, ResolveCore & AuditCore Modules
                </div>
                </div>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-200 transition-colors">
                  <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Enterprise</h4>
                <p className="text-gray-600 mb-4">End-to-end quality management with complete automation</p>
                <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg mb-3">
                  Built for large enterprises
                </div>
                <div className="text-xs text-gray-600 font-medium bg-gray-50 p-2 rounded-lg">
                  Includes: All 5 Modules (DocCore, ResolveCore, AuditCore, SupplyCore & SkillCore)
                </div>
                </div>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 mb-12">
              <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">What's Included in Every Plan</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <span className="text-green-500 mr-4 mt-1 text-xl">✓</span>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1">AI-Powered Insights</h5>
                    <p className="text-gray-600 text-sm">Smart recommendations and automated analysis</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-4 mt-1 text-xl">✓</span>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1">Document Management</h5>
                    <p className="text-gray-600 text-sm">Centralized control with version tracking</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-4 mt-1 text-xl">✓</span>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1">Compliance Tools</h5>
                    <p className="text-gray-600 text-sm">Built-in regulatory compliance features</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-4 mt-1 text-xl">✓</span>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1">24/7 Support</h5>
                    <p className="text-gray-600 text-sm">Expert assistance whenever you need it</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
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
