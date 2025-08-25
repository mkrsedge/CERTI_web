'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export function ModulesSection() {
  const [activeModule, setActiveModule] = useState(0)

  const modules = [
    {
      title: 'Smart Document Management',
      subtitle: 'Intelligent Document Control',
      description: 'Centralize all compliance documents with intelligent mapping to the requirements of your relevant standards and AI-assisted updates (e.g., new product introduction).',
      features: ['Intelligent standards mapping', 'AI-assisted document updates', 'Centralized document control', 'Compliance tracking'],
      color: 'from-blue-500 to-blue-600',
      videoId: 'gzlBOoJhP4o', // Add your YouTube video ID here
      videoTitle: 'Smart Document Management Overview'
    },
    {
      title: 'Audit Readiness',
      subtitle: 'Integrated Audit Management',
      description: 'Digitize all your audits—internal, customer, or certification (e.g., ISO, BRC)—by logging issues with evidence, converting them into actionable tasks, and assigning owners, all in one integrated platform.',
      features: ['Digital audit logging', 'Evidence management', 'Task assignment', 'Multi-standard support'],
      color: 'from-purple-500 to-purple-600',
      videoId: 'BB2pqvCokDQ', // Add your YouTube video ID here
      videoTitle: 'Audit Readiness Demo'
    },
    {
      title: 'Production Issue Resolution',
      subtitle: 'Factory Floor Solutions',
      description: 'Quickly resolve the issues on the factory floor and reduce downtime through guided root cause analysis and task-based action tracking.',
      features: ['Guided root cause analysis', 'Task-based tracking', 'Downtime reduction', 'Real-time issue resolution'],
      color: 'from-green-500 to-green-600',
      videoId: 'lO1Zllt9vqs', // Add your YouTube video ID here
      videoTitle: 'Production Issue Resolution Tutorial'
    },
    {
      title: 'Customer Complaint Resolution',
      subtitle: 'Structured Case Management',
      description: 'Turn complaints into structured cases, identify root causes, implement AI-suggested corrective actions, and generate a clean, AI-written summary report to easily share with the customer.',
      features: ['Structured case management', 'AI-suggested corrections', 'Automated report generation', 'Customer communication'],
      color: 'from-slate-400 to-slate-500',
      videoId: 'X6jP6FoM8Tc', // Add your YouTube video ID here
      videoTitle: 'Customer Complaint Resolution Walkthrough'
    }
  ]

  return (
    <section className="min-h-screen bg-white px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-light text-gray-900 mb-6">
            Use Cases
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how CERTI transforms quality management across your manufacturing operations, 
            from document control to customer satisfaction.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Module Navigation */}
          <div className="space-y-4">
            {modules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                  activeModule === index
                    ? 'bg-white shadow-lg border-l-4 border-[#a9aecf]'
                    : 'bg-transparent hover:bg-white hover:shadow-md'
                }`}
                onClick={() => setActiveModule(index)}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {module.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {module.subtitle}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Module Details */}
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            {/* Video Section */}
            {modules[activeModule].videoId ? (
              <div className="mb-8">
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-gray-100">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${modules[activeModule].videoId}?rel=0&modestbranding=1`}
                    title={modules[activeModule].videoTitle}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>

              </div>
            ) : (
              <div className="mb-8">
                <div className="aspect-video w-full rounded-xl bg-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${modules[activeModule].color} flex items-center justify-center mb-4 mx-auto`}>
                      <div className="text-white text-2xl font-bold">
                        {modules[activeModule].title.split(' ').map(word => word[0]).join('')}
                      </div>
                    </div>
                    <p className="text-gray-500">Video coming soon</p>
                  </div>
                </div>
              </div>
            )}
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              {modules[activeModule].title}
            </h3>
            
            <p className="text-[#a9aecf] font-medium mb-4">
              {modules[activeModule].subtitle}
            </p>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              {modules[activeModule].description}
            </p>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Key Features:</h4>
              {modules[activeModule].features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#a9aecf] rounded-full"></div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>


          </motion.div>
        </div>
      </div>
    </section>
  )
}
