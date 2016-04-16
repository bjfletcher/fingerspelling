'use strict';

const dictionary = {
	len2: ["he", "it", "we", "to", "no", "up", "of", "ha", "go", "do", "so", "at", "as", "be"],
	len3: ["Ben", "Cat", "Pen", "Dad", "Mum"],
	len4: ["bird", "what", "code"],
	len6: ["script", "coders", "coding"],
	len8: ["flaxseed", "function"]
};
dictionary.lenAny = dictionary.len2.concat(dictionary.len3, dictionary.len4, dictionary.len6)

module.exports = length => {
	const words = length ? dictionary[`len${length}`] : dictionary.lenAny;
	const index = Math.floor(Math.random() * words.length);
	return words[index];
}
