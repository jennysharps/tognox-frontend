export function normalizePayloadItems (payload = [], normalizeFunction, keyedBy = 'id') {
  return payload.reduce((accumulatedPayloadItems, payloadItem) => ({
    ...accumulatedPayloadItems,
    [payloadItem[keyedBy]]: normalizeFunction(payloadItem)
  }), {})
}
