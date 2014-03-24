require("should");

var path = require("path"),
    alias = require(path.join(__dirname, "..", "index.js"));


describe("normalize", function () {
    it("should return trimmed alias", function () {
        alias.normalize("system.test \\/.").should.eql("system.test");
    });
});

describe("get", function () {
    it("should return false on 'unknown' path", function () {
        alias.get("unknown").should.eql(false);
    });
});

describe("get", function () {
    alias.set("system", __dirname + "/..");
    it("should return right 'system' path", function () {
        alias.get("system").should.eql(path.join(__dirname, "..").replace(/\/$/g, ""));
    });
});

describe("get", function () {
    it("should return right 'system.lib.command' path", function () {
        alias.get("system.lib.command").should.eql(path.join(__dirname, "..", "lib", "command"));
    });
});

describe("set", function () {
    it("should set right 'some.alias.path' path", function () {
        alias.set("some.alias.path", __dirname + "/test");
        alias.get("some.alias.path").should.eql(path.join(__dirname, "test"));
    });
});

describe("set", function () {
    it("should set right 'system.alias.path' path", function () {
        alias.set("system.alias.path", __dirname + "/test");
        alias.get("system.alias.path").should.eql(path.join(__dirname, "test"));
    });
});

describe("set", function () {
    it("should set right 'system.alias.path' path", function () {
        alias.set("some.alias.path", __dirname);
        alias.set("some.alias.path", false);
        alias.get("some.alias.path").should.eql("");
    });
});

describe("getFile", function () {
    it("should return right 'system/command/environment.js' path", function () {
        alias.getFile("system.lib.command", "environment.js")
            .should.eql(path.join(__dirname, "..", "lib", "command", "environment.js"));
    });
});

describe("getFile", function () {
    it("should return false on unknown path", function () {
        alias.getFile("unknown.path", "data.js").should.eql(false);
    });
});
