function getRequestId(inventoryId, extraId) {
	const strippedId = inventoryId.replace(/-/g, '');

	let encodedString = '';

	for (let i = 0; i < strippedId.length; i++) {
		const xorResult = strippedId.charCodeAt(i) ^ extraId.charCodeAt(i);
		encodedString += String.fromCharCode(xorResult);
	}

	return btoa(encodedString).substring(0, 8);
}

module.exports = { getRequestId };