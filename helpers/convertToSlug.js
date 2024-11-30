const unidecode = require("unidecode");

module.exports.convertToSlug = (text) => {
  const stringUnidecode = unidecode(text).trim();
  const slug = stringUnidecode.replace(/\s+/g, "-");
  return slug;
}