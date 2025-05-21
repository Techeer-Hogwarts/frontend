import Section1 from '@/components/onboarding/Section1'
import Section2 from '@/components/onboarding/Section2'
import Section3 from '@/components/onboarding/Section3'
import Section4 from '@/components/onboarding/Section4'

export default function Onboarding() {
  return (
    <>
      <style>{`
      html::-webkit-scrollbar,
      body::-webkit-scrollbar {
        display: none;
      }
      html, body {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `}</style>
      <div className="relative flex flex-col gap-32">
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
      </div>
    </>
  )
}
