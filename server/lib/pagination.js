
const pagination = ({page, limit}) => {

    page = page > 0 ? page : 1;
    limit = limit > 0 ? limit : 1;

    const skip = (page - 1) * limit;

    return {skip, limit};
}

module.exports = pagination;