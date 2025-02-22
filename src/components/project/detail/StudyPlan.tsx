export default function StudyPlan({ rule }) {
  return (
    <div>
      <div className="text-[1.125rem] font-[600] mb-3">스터디 진행 방식</div>

      <div className="w-[52.5rem] p-[1.25rem] whitespace-pre-line rounded-2xl border border-gray">
        {rule}
      </div>
    </div>
  )
}
