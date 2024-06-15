export const fetchData = async () => {
  const res = await fetch(
    'https://https://65da8339bcc50200fcdcff0b.mockapi.io/api/v1/product'
  )
  const data = await res.json()
  return data
}
