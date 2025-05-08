// export const getSingleSession = async (id: string) => {
//   const response = await fetch(`/api/v1/sessions/${id}`, {
//     method: 'GET',
//     credentials: 'include',
//   })
//   if (!response.ok) {
//     throw new Error('단일 세션 데이터를 가져오는 데 실패했습니다.')
//   }
//   const result = await response.json()
//   return result
// }
