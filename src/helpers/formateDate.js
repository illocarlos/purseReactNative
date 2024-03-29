export const formateDate = date => {

    const newDate = new Date(date)
    const option = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }
    return newDate.toLocaleDateString('en-US', option)
}