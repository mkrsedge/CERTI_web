'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function OverviewSection() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const [expandedSection, setExpandedSection] = useState<number | null>(null)

  useEffect(() => {
    // Initialize skewed page scroll functionality
    let curPage = 1;
    const numOfPages = 5;
    const animTime = 1000;
    let scrolling = false;
    let isScrollLocked = false;

    function pagination() {
      scrolling = true;

      // Remove active class from current page
      document.querySelector(`.skw-page-${curPage}`)?.classList.remove("inactive");
      document.querySelector(`.skw-page-${curPage}`)?.classList.add("active");
      
      // Add inactive class to previous page
      if (curPage > 1) {
        document.querySelector(`.skw-page-${curPage - 1}`)?.classList.add("inactive");
        document.querySelector(`.skw-page-${curPage - 1}`)?.classList.remove("active");
      }
      
      // Remove active class from next page
      if (curPage < numOfPages) {
        document.querySelector(`.skw-page-${curPage + 1}`)?.classList.remove("active");
      }

      // Update progress indicator
      updateProgressIndicator();

      setTimeout(function() {
        scrolling = false;
      }, animTime);
    }

    function updateProgressIndicator() {
      // Update progress dots
      for (let i = 1; i <= numOfPages; i++) {
        const progressDot = document.getElementById(`progress-${i}`);
        if (progressDot) {
          if (i <= curPage) {
            progressDot.classList.remove('bg-brand-secondary/30');
            progressDot.classList.add('bg-brand-primary');
          } else {
            progressDot.classList.remove('bg-brand-primary');
            progressDot.classList.add('bg-brand-secondary/30');
          }
        }
      }

      // Update current page number
      const currentPageSpan = document.getElementById('current-page');
      if (currentPageSpan) {
        currentPageSpan.textContent = curPage.toString();
      }

      // Show completion message when reaching the last page
      const completionMessage = document.getElementById('completion-message');
      if (completionMessage) {
        if (curPage === numOfPages) {
          completionMessage.classList.remove('opacity-0');
          completionMessage.classList.add('opacity-100');
          // Enable page scrolling after completing all cards
          enablePageScrolling();
        } else {
          completionMessage.classList.remove('opacity-100');
          completionMessage.classList.add('opacity-0');
        }
      }
    }

    // Touch event handlers for mobile devices
    let touchStartY = 0;
    
    function handleTouchStart(e: TouchEvent) {
      touchStartY = e.touches[0].clientY;
    }
    
    function handleTouchMove(e: TouchEvent) {
      const skewedPagesSection = document.querySelector('.skw-pages');
      if (skewedPagesSection) {
        const rect = skewedPagesSection.getBoundingClientRect();
        const isInView = rect.top <= 0 && rect.bottom >= 0;
        
        if (isInView) {
          e.preventDefault();
          e.stopPropagation();
          
          const touchEndY = e.touches[0].clientY;
          const deltaY = touchStartY - touchEndY;
          
          if (Math.abs(deltaY) > 50) { // Minimum swipe distance
            if (deltaY > 0) {
              navigateDown();
            } else {
              navigateUp();
            }
            touchStartY = touchEndY;
          }
        }
      }
    }

    // Function to disable page scrolling
    function disablePageScrolling() {
      if (isScrollLocked) return; // Already locked
      
      isScrollLocked = true;
      console.log('🔒 Scroll locked - Page scrolling disabled');
      
      // Add CSS class to body for additional scroll prevention
      document.body.classList.add('scroll-locked');
      
      // Also add class to skewed pages container
      const skewedPagesContainer = document.getElementById('skewed-pages-container');
      if (skewedPagesContainer) {
        skewedPagesContainer.classList.add('scroll-locked');
      }
      
      // Show scroll lock status
      const scrollLockStatus = document.getElementById('scroll-lock-status');
      if (scrollLockStatus) {
        scrollLockStatus.classList.remove('opacity-0');
        scrollLockStatus.classList.add('opacity-100');
      }
    }

    // Function to enable page scrolling
    function enablePageScrolling() {
      if (!isScrollLocked) return; // Already unlocked
      
      isScrollLocked = false;
      console.log('🔓 Scroll unlocked - Page scrolling enabled');
      
      // Remove CSS class from body
      document.body.classList.remove('scroll-locked');
      
      // Also remove class from skewed pages container
      const skewedPagesContainer = document.getElementById('skewed-pages-container');
      if (skewedPagesContainer) {
        skewedPagesContainer.classList.remove('scroll-locked');
      }
      
      // Hide scroll lock status
      const scrollLockStatus = document.getElementById('scroll-lock-status');
      if (scrollLockStatus) {
        scrollLockStatus.classList.remove('opacity-100');
        scrollLockStatus.classList.add('opacity-0');
      }
    }

    // Handle scroll events to block all scrolling when skewed pages are active
    function handleScroll(e: Event) {
      const skewedPagesSection = document.querySelector('.skw-pages');
      if (skewedPagesSection) {
        const rect = skewedPagesSection.getBoundingClientRect();
        const isInView = rect.top <= 0 && rect.bottom >= 0;
        
        // If skewed pages are in view and scroll is locked, prevent scrolling
        if (isInView && isScrollLocked) {
          e.preventDefault();
          e.stopPropagation();
          
          // Keep the current scroll position
          const currentScrollY = window.scrollY;
          setTimeout(() => {
            if (window.scrollY !== currentScrollY) {
              window.scrollTo(0, currentScrollY);
            }
          }, 0);
        }
      }
    }

    function navigateUp() {
      if (curPage === 1) return;
      curPage--;
      pagination();
    }

    function navigateDown() {
      if (curPage === numOfPages) return;
      curPage++;
      pagination();
    }

    // Handle mouse wheel events
    function handleWheel(e: WheelEvent) {
      if (scrolling) return;
      
      // Check if user is currently viewing the skewed pages section
      const skewedPagesSection = document.querySelector('.skw-pages');
      if (skewedPagesSection) {
        const rect = skewedPagesSection.getBoundingClientRect();
        const isInView = rect.top <= 0 && rect.bottom >= 0;
        
        // Only prevent scroll and handle navigation when skewed pages are in view
        if (isInView) {
          e.preventDefault();
          e.stopPropagation();
          
          // Disable page scrolling when entering skewed pages
          if (curPage === 1 && !isScrollLocked) {
            disablePageScrolling();
          }
          
          if (e.deltaY > 0) {
            navigateDown();
          } else { 
            navigateUp();
          }
        }
      }
    }

    // Handle keyboard events
    function handleKeydown(e: KeyboardEvent) {
      if (scrolling) return;
      if (e.key === 'ArrowUp') {
        navigateUp();
      } else if (e.key === 'ArrowDown') {
        navigateDown();
      }
    }

    // Add event listeners
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeydown);
    
    // Add touch event listeners for mobile devices
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    // Add scroll event listener to block all scroll events when skewed pages are active
    document.addEventListener('scroll', handleScroll, { passive: false });

    // Initialize first page
    pagination();

    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('scroll', handleScroll);
      
      // Re-enable page scrolling when component unmounts
      enablePageScrolling();
    }
  }, [])

  const qualitySteps = [
    {
      id: 1,
      title: "Plug in your quality world",
      description: "Connect your drives and systems; CERTI snaps into your workflow so data flows in without messy migrations.",
      tag: "API-first integration",
      bgColor: "bg-orange-50",
      iconColor: "bg-orange-400",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      gifPlaceholder: "https://via.placeholder.com/800x600/fb923c/ffffff?text=Quality+Integration+GIF"
    },
    {
      id: 2,
      title: "CERTI learns your company",
      description: "Our AI reads your SOPs, HACCP plans, and policies, then maps them to the standards you follow.",
      tag: "AI-powered document analysis",
      bgColor: "bg-blue-50",
      iconColor: "bg-blue-500",
      icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
      gifPlaceholder: "https://via.placeholder.com/800x600/3b82f6/ffffff?text=AI+Learning+GIF"
    },
    {
      id: 3,
      title: "Stay continuously audit-ready",
      description: "Evidence stays live and traceable. CERTI watches every revision, runs AI pre-checks before you walk the floor.",
      tag: "Real-time monitoring",
      bgColor: "bg-green-50",
      iconColor: "bg-green-500",
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      gifPlaceholder: "https://via.placeholder.com/800x600/22c55e/ffffff?text=Audit+Ready+GIF"
    },
    {
      id: 4,
      title: "Fix problems for good",
      description: "When issues arise, CERTI guides root-cause analysis and drafts precise CAPAs from your own procedures.",
      tag: "AI-guided CAPA workflow",
      bgColor: "bg-red-50",
      iconColor: "bg-red-500",
      icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
      gifPlaceholder: "https://via.placeholder.com/800x600/ef4444/ffffff?text=Problem+Solving+GIF"
    },
    {
      id: 5,
      title: "Prove reliability and protect revenue",
      description: "With always-ready evidence and closed-loop CAPAs, you reduce findings, keep customers confident, and safeguard high-value contracts.",
      tag: "Business impact",
      bgColor: "bg-purple-50",
      iconColor: "bg-purple-500",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1",
      gifPlaceholder: "https://via.placeholder.com/800x600/8b5cf6/ffffff?text=Revenue+Protection+GIF"
    }
  ]

  const coreFeatures = [
    {
      title: 'AI-Powered Analytics',
      description: 'Intelligent analysis of quality data to identify patterns and predict potential issues before they occur.',
      dot: true
    },
    {
      title: 'Smart Compliance Tracking',
      description: 'Automated compliance monitoring with real-time alerts for regulatory requirements and standards.',
      dot: true
    },
    {
      title: 'Predictive Quality Control',
      description: 'Machine learning algorithms that forecast quality issues and recommend preventive actions.',
      dot: true
    },
    {
      title: 'Regulatory Intelligence',
      description: 'Stay ahead of changing regulations with AI-driven regulatory updates and compliance recommendations.',
      dot: true
    }
  ]

  const additionalFeatures = [
    {
      title: 'Document Control',
      description: 'Centralized document management with version control and automated approval workflows.'
    },
    {
      title: 'Audit Management',
      description: 'Streamlined audit processes with automated checklists and real-time reporting capabilities.'
    },
    {
      title: 'Risk Assessment',
      description: 'AI-driven risk identification and mitigation strategies for manufacturing processes.'
    },
    {
      title: 'Training & Certification',
      description: 'Manage employee training records and ensure compliance with certification requirements.'
    },
    {
      title: 'Supplier Quality',
      description: 'Monitor and evaluate supplier performance with comprehensive quality scorecards.'
    },
    {
      title: 'Reporting Dashboard',
      description: 'Real-time quality metrics and compliance status with customizable reporting views.'
    }
  ]

  return (
    <section className="min-h-screen bg-white px-6 py-20 relative">
      <div className="max-w-7xl mx-auto overview-content">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl md:text-7xl font-normal text-brand-primary mb-6">
            Meet CERTI
          </h1>
          <p className="text-xl text-brand-secondary max-w-4xl mx-auto">
            The AI-native quality management system that turns manufacturing chaos into controlled excellence. 
            Built specifically for manufacturers who need compliance without compromise.
          </p>
        </motion.div>

        {/* Capabilities Sliding Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 relative"
        >
          {/* Carousel Container */}
          <div className="slider-container">
            <div className="slider">
              <div className="slide-track">
                {/* First set of cards */}
                {additionalFeatures.map((feature, index) => (
                  <div key={`first-${index}`} className="slide">
                    <div className="bg-brand-primary rounded-xl p-6 shadow-lg border border-brand-secondary/20 h-full">
                      <div className="flex flex-col items-center text-center space-y-4">
                        {/* Icon */}
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          index === 0 ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                          index === 1 ? 'bg-gradient-to-br from-green-400 to-green-600' :
                          index === 2 ? 'bg-gradient-to-br from-red-400 to-red-600' :
                          index === 3 ? 'bg-gradient-to-br from-purple-400 to-purple-600' :
                          index === 4 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                          'bg-gradient-to-br from-gray-400 to-gray-600'
                        }`}>
                          {index === 0 && (
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          )}
                          {index === 1 && (
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                          )}
                          {index === 2 && (
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                          )}
                          {index === 3 && (
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          )}
                          {index === 4 && (
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          )}
                          {index === 5 && (
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          )}
                        </div>

                        {/* Content */}
                        <div className="space-y-3">
                          <h4 className="text-lg font-semibold text-brand-secondary">
                            {feature.title}
                          </h4>
                          <p className="text-brand-secondary/80 leading-relaxed text-sm">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {additionalFeatures.map((feature, index) => (
                  <div key={`second-${index}`} className="slide">
                    <div className="bg-brand-primary rounded-xl p-6 shadow-lg border border-brand-secondary/20 h-full">
                      <div className="flex flex-col items-center text-center space-y-4">
                        {/* Icon */}
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          index === 0 ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                          index === 1 ? 'bg-gradient-to-br from-green-400 to-green-600' :
                          index === 2 ? 'bg-gradient-to-br from-red-400 to-red-600' :
                          index === 3 ? 'bg-gradient-to-br from-purple-400 to-purple-600' :
                          index === 4 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                          'bg-gradient-to-br from-gray-400 to-gray-600'
                        }`}>
                          {index === 0 && (
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          )}
                          {index === 1 && (
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                          )}
                          {index === 2 && (
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                          )}
                          {index === 3 && (
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          )}
                          {index === 4 && (
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          )}
                          {index === 5 && (
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          )}
                        </div>

                        {/* Content */}
                        <div className="space-y-3">
                          <h4 className="text-lg font-semibold text-brand-secondary">
                            {feature.title}
                          </h4>
                          <p className="text-brand-secondary/80 leading-relaxed text-sm">
                            {feature.description}
                          </p>
                </div>
                </div>
                </div>
                </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Transform your quality management - Timeline Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-normal text-brand-secondary mb-16">
            Transform your quality management
          </h2>
          
          {/* Timeline Container */}
          <div className="max-w-6xl mx-auto">
            {/* Timeline Line Container */}
            <div className="relative mb-8">
              {/* Connecting Line */}
              <div className="absolute top-4 left-8 right-8 h-0.5 bg-brand-secondary/30 hidden md:block"></div>
              
              {/* Timeline Steps */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-left"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-6 relative z-10"
                  >
                    <div className="w-16 h-8 bg-yellow-300 rounded-r-full flex items-center justify-center font-bold text-brand-secondary shadow-md">
                      1
          </div>
        </motion.div>
                  <h3 className="text-lg font-semibold text-brand-secondary mb-3">
                    Always ready and compliant
                  </h3>
                  <p className="text-brand-secondary/80 leading-relaxed text-sm">
                    Live clause coverage, mapped evidence, no document hunts. Submit as many quality checks as you need without worrying about compliance gaps.
              </p>
            </motion.div>
            
                {/* Step 2 */}
            <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-left"
                >
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-6 relative z-10"
                  >
                    <div className="w-16 h-8 bg-blue-300 rounded-r-full flex items-center justify-center font-bold text-brand-secondary shadow-md">
                      2
                    </div>
                  </motion.div>
                  <h3 className="text-lg font-semibold text-brand-secondary mb-3">
                    Fix it for good
                  </h3>
                  <p className="text-brand-secondary/80 leading-relaxed text-sm">
                    AI-guided root cause and CAPAs tied to your SOPs. Our system gets to work to deliver your corrective actions within a few cycles.
                  </p>
                </motion.div>
                
                {/* Step 3 */}
                  <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-left"
                >
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mb-6 relative z-10"
                  >
                    <div className="w-16 h-8 bg-purple-300 rounded-r-full flex items-center justify-center font-bold text-brand-secondary shadow-md">
                      3
                    </div>
                  </motion.div>
                  <h3 className="text-lg font-semibold text-brand-secondary mb-3">
                    Scale without limits
                  </h3>
                  <p className="text-brand-secondary/80 leading-relaxed text-sm">
                    Add new products, facilities, or standards without adding complexity. Our AI adapts to your growth, keeping quality management simple.
                  </p>
                  </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quality Management Process Flow - Skewed Page Scroll */}
        {/* Journey Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 px-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-brand-secondary mb-6">
            Embark on Your CERTI Journey
          </h2>
          <p className="text-xl text-brand-secondary/80 max-w-3xl mx-auto leading-relaxed">
            Follow the seamless integration and success path that transforms your quality management from chaos to controlled excellence. 
            Each step builds upon the last, creating a comprehensive ecosystem that evolves with your manufacturing needs.
          </p>
        </motion.div>

        {/* Skewed Pages Container */}
        <div className="skw-pages" id="skewed-pages-container">
          {/* Page 1 */}
          <div className="skw-page skw-page-1 active">
            <div className="skw-page__half skw-page__half--left">
              <div className="skw-page__skewed">
                <div className="skw-page__content" style={{ backgroundImage: `url(${qualitySteps[0].gifPlaceholder})` }}>
                  <div className="skw-page__overlay">
                    <div className="skw-page__icon">
                      <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={qualitySteps[0].icon} />
                    </svg>
                  </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="skw-page__half skw-page__half--right">
              <div className="skw-page__skewed">
                <div className="skw-page__content">
                  <h2 className="skw-page__heading">{qualitySteps[0].title}</h2>
                  <p className="skw-page__description">{qualitySteps[0].description}</p>
                  <div className="skw-page__tag">{qualitySteps[0].tag}</div>
                </div>
              </div>
                </div>
              </div>

          {/* Page 2 */}
          <div className="skw-page skw-page-2">
            <div className="skw-page__half skw-page__half--left">
              <div className="skw-page__skewed">
                <div className="skw-page__content">
                  <h2 className="skw-page__heading">{qualitySteps[1].title}</h2>
                  <p className="skw-page__description">{qualitySteps[1].description}</p>
                  <div className="skw-page__tag">{qualitySteps[1].tag}</div>
                </div>
              </div>
            </div>
            <div className="skw-page__half skw-page__half--right">
              <div className="skw-page__skewed">
                <div className="skw-page__content" style={{ backgroundImage: `url(${qualitySteps[1].gifPlaceholder})` }}>
                  <div className="skw-page__overlay">
                    <div className="skw-page__icon">
                      <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={qualitySteps[1].icon} />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
                </div>
              </div>

          {/* Page 3 */}
          <div className="skw-page skw-page-3">
            <div className="skw-page__half skw-page__half--left">
              <div className="skw-page__skewed">
                <div className="skw-page__content" style={{ backgroundImage: `url(${qualitySteps[2].gifPlaceholder})` }}>
                  <div className="skw-page__overlay">
                    <div className="skw-page__icon">
                      <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={qualitySteps[2].icon} />
                      </svg>
                  </div>
                </div>
              </div>
            </div>
            </div>
            <div className="skw-page__half skw-page__half--right">
              <div className="skw-page__skewed">
                <div className="skw-page__content">
                  <h2 className="skw-page__heading">{qualitySteps[2].title}</h2>
                  <p className="skw-page__description">{qualitySteps[2].description}</p>
                  <div className="skw-page__tag">{qualitySteps[2].tag}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Page 4 */}
          <div className="skw-page skw-page-4">
            <div className="skw-page__half skw-page__half--left">
              <div className="skw-page__skewed">
                <div className="skw-page__content">
                  <h2 className="skw-page__heading">{qualitySteps[3].title}</h2>
                  <p className="skw-page__description">{qualitySteps[3].description}</p>
                  <div className="skw-page__tag">{qualitySteps[3].tag}</div>
                </div>
              </div>
            </div>
            <div className="skw-page__half skw-page__half--right">
              <div className="skw-page__skewed">
                <div className="skw-page__content" style={{ backgroundImage: `url(${qualitySteps[3].gifPlaceholder})` }}>
                  <div className="skw-page__overlay">
                    <div className="skw-page__icon">
                      <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={qualitySteps[3].icon} />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Page 5 */}
          <div className="skw-page skw-page-5">
            <div className="skw-page__half skw-page__half--left">
              <div className="skw-page__skewed">
                <div className="skw-page__content" style={{ backgroundImage: `url(${qualitySteps[4].gifPlaceholder})` }}>
                  <div className="skw-page__overlay">
                    <div className="skw-page__icon">
                      <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={qualitySteps[4].icon} />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="skw-page__half skw-page__half--right">
              <div className="skw-page__skewed">
                <div className="skw-page__content">
                  <h2 className="skw-page__heading">{qualitySteps[4].title}</h2>
                  <p className="skw-page__description">{qualitySteps[4].description}</p>
                  <div className="skw-page__tag">{qualitySteps[4].tag}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator text-center mt-8">
          <div className="flex items-center justify-center space-x-2 text-brand-secondary/60">
            <span className="text-sm">Scroll to navigate through the journey</span>
            <div className="w-6 h-6 border-2 border-brand-secondary/30 rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-brand-secondary/60 rounded-full animate-bounce"></div>
            </div>
          </div>
          
          {/* Progress Indicator */}
          <div className="mt-4 flex items-center justify-center space-x-2">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((pageNum) => (
                <div
                  key={pageNum}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    pageNum === 1 ? 'bg-brand-primary' : 'bg-brand-secondary/30'
                  }`}
                  id={`progress-${pageNum}`}
                ></div>
          ))}
        </div>
            <span className="text-xs text-brand-secondary/50 ml-2">
              <span id="current-page">1</span> of 5
            </span>
          </div>
          
          {/* Completion Message */}
          <div 
            id="completion-message" 
            className="mt-4 text-sm text-brand-primary font-medium opacity-0 transition-opacity duration-500"
          >
            ✓ Journey complete! Continue scrolling to explore more
          </div>
          
          {/* Scroll Lock Status */}
          <div 
            id="scroll-lock-status" 
            className="mt-3 text-xs text-brand-secondary/50 opacity-0 transition-opacity duration-300"
          >
            🔒 Page scroll locked - Complete the journey to continue
          </div>
          </div>


          </div>

      {/* Skewed Pages Styles */}
      <style jsx>{`
        .skw-pages {
          overflow: hidden;
          position: relative;
          height: 100vh;
          margin: 2rem 0;
        }

        .skw-page {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100vh;
        }

        .skw-page__half {
          position: absolute;
          top: 0;
          width: 50%;
          height: 100vh;
          transition: transform 1s;
        }

        .skw-page__half--left {
          left: 0;
          transform: translate3d(-32.4vh, 100%, 0);
        }

        .skw-page__half--right {
          left: 50%;
          transform: translate3d(32.4vh, -100%, 0);
        }

        .skw-page.active .skw-page__half {
          transform: translate3d(0, 0, 0);
        }

        .skw-page__skewed {
          overflow: hidden;
          position: absolute;
          top: 0;
          width: 140%;
          height: 100%;
          transform: skewX(-18deg);
          background: #000;
        }

        .skw-page__half--left .skw-page__skewed {
          left: -40%;
        }

        .skw-page__half--right .skw-page__skewed {
          right: -40%;
        }

        .skw-page__content {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-flow: column wrap;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          padding: 0 30%;
          color: #fff;
          transform: skewX(18deg);
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.3);
        }

        .skw-page__half--left .skw-page__content {
          padding-left: 30%;
          padding-right: 30%;
          transform-origin: 100% 0;
        }

        .skw-page__half--right .skw-page__content {
          padding-left: 30%;
          padding-right: 30%;
          transform-origin: 0 100%;
        }

        .skw-page.inactive .skw-page__content {
          opacity: 0.5;
          transform: skewX(18deg) scale(0.95);
        }

        .skw-page__heading {
          margin-bottom: 15px;
          text-transform: uppercase;
          font-size: 25px;
          text-align: center;
          font-weight: bold;
          color: #fff;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
        }

        .skw-page__description {
          font-size: 18px;
          text-align: center;
          color: #fff;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .skw-page__tag {
          background: rgba(255, 255, 255, 0.2);
          color: #fff;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .skw-page__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .skw-page__icon {
          background: rgba(255, 255, 255, 0.2);
          padding: 20px;
          border-radius: 50%;
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }

        .skw-page__icon:hover {
          transform: scale(1.1);
          background: rgba(255, 255, 255, 0.3);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
        }

        /* Background colors for each page */
        .skw-page-1 .skw-page__half--right .skw-page__content {
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
        }

        .skw-page-2 .skw-page__half--left .skw-page__content {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        }

        .skw-page-3 .skw-page__half--right .skw-page__content {
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
        }

        .skw-page-4 .skw-page__half--left .skw-page__content {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        }

        .skw-page-5 .skw-page__half--right .skw-page__content {
          background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .skw-pages {
            height: 80vh;
          }

          .skw-page__content {
            padding: 0 20%;
          }

          .skw-page__heading {
            font-size: 20px;
          }

          .skw-page__description {
            font-size: 16px;
          }

          .skw-page__icon {
            padding: 15px;
          }

          .skw-page__icon svg {
            width: 12px;
            height: 12px;
          }
        }

        /* Scroll indicator styles */
        .scroll-indicator {
          opacity: 0.8;
          transition: opacity 0.3s ease;
        }

        .scroll-indicator:hover {
          opacity: 1;
        }

        /* Progress indicator styles */
        .scroll-indicator .flex.space-x-1 > div {
          transition: all 0.3s ease;
        }

        .scroll-indicator .flex.space-x-1 > div:hover {
          transform: scale(1.2);
        }

        /* Completion message styles */
        #completion-message {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 197, 253, 0.1) 100%);
          padding: 8px 16px;
          border-radius: 20px;
          border: 1px solid rgba(59, 130, 246, 0.2);
          backdrop-filter: blur(10px);
        }

        /* Scroll lock status styles */
        #scroll-lock-status {
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(252, 165, 165, 0.1) 100%);
          padding: 6px 12px;
          border-radius: 12px;
          border: 1px solid rgba(239, 68, 68, 0.2);
          backdrop-filter: blur(10px);
          font-weight: 500;
        }

        /* Global scroll lock styles */
        body.scroll-locked {
          overflow: hidden !important;
        }

        body.scroll-locked html {
          overflow: hidden !important;
        }

        /* Ensure skewed pages remain interactive when scroll is locked */
        body.scroll-locked .skw-pages {
          pointer-events: auto;
        }

        body.scroll-locked .skw-pages * {
          pointer-events: auto;
        }

        /* Prevent any scrolling when locked */
        body.scroll-locked {
          position: relative;
        }

        /* Alternative approach: prevent scroll only on the skewed pages container */
        #skewed-pages-container.scroll-locked {
          overflow: hidden !important;
          position: relative;
        }

        /* Pricing plan hover and click indicators */
        .cursor-pointer {
          cursor: pointer;
        }

        .cursor-pointer:hover {
          transform: translateY(-2px);
        }

        .cursor-pointer:active {
          transform: translateY(0);
        }

        /* Expanded plan styling */
        .scale-105 {
          transform: scale(1.05);
        }

        /* Smooth transitions for all interactive elements */
        .transition-all {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Plan card interactive states */
        .plan-card {
          position: relative;
          overflow: visible;
        }

        .plan-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: inherit;
          background: linear-gradient(45deg, transparent, rgba(255, 105, 53, 0.05), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .plan-card:hover::before {
          opacity: 1;
        }

        /* Popover animations */
        .popover-enter {
          opacity: 0;
          transform: scale(0.95) translateY(10px);
        }

        .popover-enter-active {
          opacity: 1;
          transform: scale(1) translateY(0);
          transition: all 0.2s ease-out;
        }

        .popover-exit {
          opacity: 1;
          transform: scale(1) translateY(0);
        }

        .popover-exit-active {
          opacity: 0;
          transform: scale(0.95) translateY(10px);
          transition: all 0.15s ease-in;
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-4px);
          }
          60% {
            transform: translateY(-2px);
          }
        }

        /* Slider styles for the carousel above */
        .slider-container {
          margin: auto;
          overflow: hidden;
          position: relative;
          width: 100%;
          max-width: 1200px;
        }

        .slider {
          background: linear-gradient(to right, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 10%, rgba(255,255,255,0) 90%, rgba(255,255,255,0.9) 100%);
          height: 280px;
          margin: auto;
          overflow: hidden;
          position: relative;
          width: 100%;
        }

        .slider::before,
        .slider::after {
          background: linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
          content: "";
          height: 280px;
          position: absolute;
          width: 120px;
          z-index: 2;
        }

        .slider::after {
          right: 0;
          top: 0;
          transform: rotateZ(180deg);
        }

        .slider::before {
          left: 0;
          top: 0;
        }

        .slide-track {
          animation: scroll 30s linear infinite;
          display: flex;
          width: calc(320px * 12);
        }

        .slide {
          height: 280px;
          width: 320px;
          padding: 0 16px;
          flex-shrink: 0;
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-320px * 6)); }
        }

        .slide-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
