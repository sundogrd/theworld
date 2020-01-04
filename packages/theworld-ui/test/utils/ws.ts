export function checkDataFormat(data: string) {
    const trimedData = data.trim();
    const parts = trimedData.split(' ').filter(data => data);

    const isValid = parts.every((part, idx) => {
        if (!idx) {
            return part[0] === '@'
        }
        return part[0] !== ':' && part[part.length - 1] !== ':' && part.indexOf(':') > -1
    })
    return isValid
}