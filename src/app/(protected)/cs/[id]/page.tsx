import CsPage from '@/components/cs/CsPage'

export default async function CsDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <CsPage id={id} />
}
