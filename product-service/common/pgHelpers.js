export const insert = ({ table, keys, values }) => {
  const queryValues = values.map(v => {
    return `(${v.map(v => {
      if (!isNaN(Number(v))) return Number(v)
      return `'${v}'`
    })})`;
  })
  const query = `INSERT INTO public.${table} (${keys}) VALUES ${queryValues} returning *`

  return query;
}
