export const horaMes = (fecha) => {
  const fechaObj = new Date(fecha)
  
  const formatoFecha = new Intl.DateTimeFormat('es', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    day: 'numeric',
    month: 'long',
    weekday: 'long'
  })

  return formatoFecha.format(fechaObj)
}
