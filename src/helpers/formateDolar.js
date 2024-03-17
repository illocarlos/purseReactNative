export const formateDolar = cuantity => {

    return Number(cuantity).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    })
}