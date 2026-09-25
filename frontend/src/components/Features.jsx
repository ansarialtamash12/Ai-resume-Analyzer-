
const Features = () => {
  return (
    <>
    <section className="max-w-7xl mx-auto px-8 py-24">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold">
                Powerful AI Features
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "ATS Score",
                "Skill Gap Analysis",
                "keyword Optimization",
                "Interview Questions",
              ].map((features)=>(
                <div 
                key={features}
                className="bg-white/5 border border-white/10 rounded-2xl hover:border-cyan-400 hover:translate-y-1 transition-all duration-300 p-8">
                  <h3 className="text-xl font-semibold mb-3">
                    {features}
                  </h3>
                  <p className="text-gray-400">
                    AI-powered analysis to improve your resume.
                  </p>
                  </div>
              ))}
            </div>
          </section>
    </>
  )
}

export default Features
