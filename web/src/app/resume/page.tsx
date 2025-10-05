'use client'

const ResumeContent = () => {
  const resumeUrl = 'https://elizabethevansresume.s3.us-east-1.amazonaws.com/ElizabethEvans_SoftwareEngineer.pdf'
  
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Resume
        </h1>
        <a
          href={resumeUrl}
          download="ElizabethEvans_SoftwareEngineer_Resume.pdf"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          📄 Download PDF
        </a>
      </div>

      {/* PDF Viewer */}
      <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <iframe
          src={resumeUrl}
          width="100%"
          height="800"
          className="w-full"
          title="Software Engineer Resume"
        />
      </div>

      {/* Mobile fallback message */}
      <div className="block md:hidden text-center text-gray-600 dark:text-gray-400">
        <p>Having trouble viewing? <a href={resumeUrl} className="text-blue-600 underline">Download the PDF</a> instead.</p>
      </div>
    </div>
  )
}

export default function ResumePage() {
  return <ResumeContent />
}
