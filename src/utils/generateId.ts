function generateRandomId(prefix: string) {
    const randomId = Math.random().toString(36).substring(2, 6);
    return prefix + randomId;
}
function invoiceNumber(prefix: string) {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomId = (Math.random() * 10000).toFixed(0);
    return `${prefix}-${date}-${randomId}`;
}

export { generateRandomId, invoiceNumber };