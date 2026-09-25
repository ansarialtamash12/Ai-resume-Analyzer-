
const HowItWorks = () => {
  return (
    <>
     <section className="max-w-7xl mx-auto px-8 py-24">
            <div className="text-center mb-16">
              <p className="text-cyan-400 uppercase tracking-[0.3em] text-sm">
                How It Works
              </p>
              <h2 className="text-5xl font-bold mt-4">
                From upload to insight in second
              </h2>
            </div>
            <div className="grid md:grid-cols-5 gap-6">
              {[
                {
                  no:"01",
                  title:"Upload",
                  desc:"Upload your resume in PDF or DOCX fromat.",
                },
                {
                  no:"02",
                  title:"Paste JD",
                  desc:"Add the job description you want to target.",
                },
                {
                  no:"03",
                  title:"Parse",
                  desc:"AI extracts skills, experience and education.",
                },
                {
                  no:"04",
                  title:"Match",
                  desc:"Compare resume with job requirements",
                },
                 {
                  no:"05",
                  title:"Score",
                  desc:"Receive ATS score and improvement tips.",
                },
              ].map((item) => (
                <div key={item.no}
                className=" group bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg hover:border-cyan-400/60 hover:bg-white/10 hover:translate-y-1 transition-all duration-300">
                  <span className="text-cyan-400 font-mono text-lg group-hover:text-white transition-colors duration-300">
                    {item.no}
                  </span>
                  <h3 className="text-2xl font-semibold mt-4 group-hover:text-cyan-300 transition-all duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 mt-3 group-hover:text-gray-300 transition-all duration-300">
                    {item.desc}
                  </p>
                  </div>
              ))}
            </div>
          </section>
    </>
  )
}

export default HowItWorks
