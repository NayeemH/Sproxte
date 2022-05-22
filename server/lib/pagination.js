const pagination = ({page, limit}, totalCount = 1) => {

    page = page > 0 ? page : 1;
    limit = limit > 0 ? limit : totalCount;

    const skip = (page - 1) * limit;

    return {skip, limit};
}

module.exports = pagination;