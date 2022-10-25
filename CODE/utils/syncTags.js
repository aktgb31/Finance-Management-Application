const tags = require('../config/tags.json');
const Tag = require('../models/tag');

const syncTags = async () => {
    for (const tag of Object.values(tags)) {
        const [tempTag, created] = await Tag.findOrCreate({ where: { ...tag } });
        if (!created) {
            // Compare tempTag data with tag. If they are not equal, throw error else, continue.
            if (tempTag.name !== tag.name || tempTag.multiplier !== tag.multiplier) {
                throw new Error('Tag data mismatch. Create new tag with new id.');
            }
        }
    }
};

module.exports = syncTags;