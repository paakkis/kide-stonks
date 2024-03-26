const axios = require('axios');
const { Deobfuscator } = require('deobfuscator');

// ###### UTILS ######

function containsHexCode(str) {
	// Regular expression to match the hexadecimal pattern
	const hexPattern = /(_0x|0x)[0-9a-fA-F]+/g;

	// Search the string for the pattern
	return hexPattern.test(str);
}

// #### MAIN ####

const KIDE_URL = 'https://kide.app';
const BODY_SCRIPT_PATH_BASE = 'scripts/body.js?v=';

async function getLatestBodyScriptVersion() {
	const res = await axios.get(KIDE_URL);
	const htmlString = res.data;

	const splitted = htmlString.split(`src="/${BODY_SCRIPT_PATH_BASE}`);

	if (splitted.length !== 2) {
		throw new Error('There was more or less than one body script in the html');
	}

	const scriptVersion = splitted[1].split('"')[0];

	if (!scriptVersion) {
		throw new Error('Could not find the script version');
	}
	return scriptVersion;
}

async function getLatestBodyScriptContent() {
	const scriptVersion = await getLatestBodyScriptVersion();
	const scriptUrl = `${KIDE_URL}/${BODY_SCRIPT_PATH_BASE}${scriptVersion}`;
	return axios.get(scriptUrl).then(res => res.data);
}

function extractObfuscatedCode(code) {
	const splitted = code.split(';');
	const start = splitted.findIndex(line => containsHexCode(line) && line.startsWith('function'));

	const end = splitted.findIndex(
		line => containsHexCode(line) && /\(.*window\[.*'in'\]=window\[.*'in'\]/.test(line)
	);

	// Get the lines between the start and end index
	const lines = splitted.slice(start, end + 1);
	const combined = lines.join(';');

	return combined;
}

async function deobfuscate(code) {
	const deobfuscator = new Deobfuscator();
	return deobfuscator.deobfuscateSource(code);
}

function extractExtraID(deobfuscatedCode) {
	const splitted = deobfuscatedCode.split(".isTrusted ? '");
	const extraID = splitted[1].split("'")[0];
	return extraID;
}

async function getLatestExtraIdLocal() {
	const scriptContent = await getLatestBodyScriptContent();
	const obfuscatedCode = extractObfuscatedCode(scriptContent);
	const deobfuscatedCode = await deobfuscate(obfuscatedCode);
	const extraID = extractExtraID(deobfuscatedCode);
	return extraID;
}

async function getLatestExtraIdFromAPI(apiUrl) {
	return axios.get(apiUrl).then(res => res.data);
}

async function getLatestExtraID(apiUrl) {
	if (apiUrl) {
		return getLatestExtraIdFromAPI(apiUrl);
	}
	return getLatestExtraIdLocal();
}

module.exports = {
    getLatestExtraIdLocal
  }