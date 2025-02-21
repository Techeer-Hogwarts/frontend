import { useRouter } from 'next/navigation'

interface SectionProps {
  id: string
  title: string
  children: React.ReactNode
}

const Section: React.FC<SectionProps> = ({ id, title, children }) => {
  return (
    <div id={id} className="mt-10">
      <h3 className="text-2xl font-semibold mb-6">{title}</h3>
      {children}
    </div>
  )
}

export default Section
