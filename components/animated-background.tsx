'use client'

export function AnimatedBackground() {
  return (
    <>
      {/* Grainy animated noise overlay */}
      <div 
        className="fixed inset-0 w-full h-full pointer-events-none z-30"
        style={{
          background: 'transparent url("http://assets.iceable.com/img/noise-transparent.png") repeat 0 0',
          backgroundSize: '300px 300px',
          animation: 'noise-animation 8s ease-in-out infinite',
          opacity: 0.4,
          willChange: 'transform'
        }}
      />
      
      {/* Subtle gradient overlay for depth */}
      <div 
        className="fixed inset-0 w-full h-full pointer-events-none z-20"
        style={{
          background: 'radial-gradient(circle at 30% 20%, rgba(255, 107, 53, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(59, 130, 246, 0.06) 0%, transparent 50%), radial-gradient(circle at 40% 70%, rgba(34, 197, 94, 0.04) 0%, transparent 50%)'
        }}
      />
      
      <style jsx global>{`
        @keyframes noise-animation {
          0% { transform: translate(0, 0); }
          10% { transform: translate(-0.05%, -0.08%); }
          20% { transform: translate(-0.1%, 0.05%); }
          30% { transform: translate(0.05%, -0.1%); }
          40% { transform: translate(-0.05%, 0.12%); }
          50% { transform: translate(-0.1%, 0.05%); }
          60% { transform: translate(0.08%, 0); }
          70% { transform: translate(0, 0.08%); }
          80% { transform: translate(-0.08%, 0); }
          90% { transform: translate(0.05%, 0.05%); }
          100% { transform: translate(0.03%, 0); }
        }
      `}</style>
    </>
  )
}
