import CsPage from '@/components/cs/CsPage'

export default function CsDetail({ params }: { params: { id: string } }) {
  return <CsPage id={params.id} />
}
