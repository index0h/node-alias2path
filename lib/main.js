var modulePath = require("path"),
    list = {};

/**
 * @param {string} value Dirty path.
 * @returns {string}
 */
var normalize = function (value) {
    return value.replace(/([\s\\\/\.]+)$/g, "");
};

/**
 * @param {string}  alias Path alias.
 * @param {boolean} save  Store path in memory.
 * @returns {string}|{boolean}
 */
var get = function (alias, save) {
    save = save || true;

    if (typeof list[alias] === "string") {
        return list[alias];
    }

    var position = alias.indexOf("."),
        rootAlias,
        result = false;

    if (position !== -1) {
        rootAlias = alias.substr(0, position);

        if (typeof list[rootAlias] === "string") {

            result = list[rootAlias]
                + modulePath.sep
                + modulePath.join.apply(modulePath, alias.substr(position + 1).split("."));

            if (save === true) {
                list[alias] = result;
            }

            return result;
        }
    }

    return result;
};

/**
 * @param {string}  alias Path alias.
 * @param {boolean} path  Real path of alias.
 */
var set = function (alias, path) {
    path = path || false;
    alias = normalize(alias);

    if ((typeof list[alias] === "string") && (path === false)) {
        delete list[alias];
        return;
    }
    path = modulePath.normalize(path).replace(/[\s\\\/]$/g, "");

    list[alias] = path;
};

/**
 * @param {string} alias    Alias of path to folder.
 * @param {string} fileName Name of file.
 * @returns {string}|{boolean}
 */
var getFile = function (alias, fileName) {
    var path = get(alias, false);
    if (path === false) {
        return false;
    }
    return modulePath.join(path, fileName);
};

module.exports.get = get;
module.exports.getFile = getFile;
module.exports.normalize = normalize;
module.exports.set = set;
module.exports.list = list;