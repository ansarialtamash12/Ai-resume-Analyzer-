
const Stats = () => {
  return (
   <>
     <section className="max-w-6xl mx-auto px-8 py-24">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-5xl font-bold text-blue-500">
                  95%
                </h3>
                <p className="text-gray-400 mt-3">
                  ATS Matching Accuracy
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-5xl font-bold text-blue-500">
                  Instant
                </h3>
              <p className="text-gray-400 mt-3">
                Resume Analysis
              </p>
              </div>
              <div className="text-center">
                <h3 className="text-5xl font-bold text-blue-500">
                  AI
                </h3>
                <p className="text-gray-400 mt-3">
                  Personalized Suggestions
                </p>
              </div>
            </div>

          </section>
   </>
  )
}

export default Stats
