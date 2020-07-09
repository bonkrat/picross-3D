module.exports = {
    views: {
        findAll: {
            map: function (doc) {
                emit(doc);
            }
        }
    }
};
