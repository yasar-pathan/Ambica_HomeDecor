const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-') // Replace spaces and non-word chars with -
    .replace(/^-+|-+$/g, '');    // Remove leading/trailing -
};

const generateUniqueSlug = async (Model, text, id = null) => {
  let baseSlug = slugify(text);
  let slug = baseSlug;
  let counter = 1;
  
  while (true) {
    const query = { slug };
    if (id) query._id = { $ne: id };
    
    const exists = await Model.exists(query);
    if (!exists) break;
    
    counter++;
    slug = `${baseSlug}-${counter}`;
  }
  return slug;
};

module.exports = { slugify, generateUniqueSlug };