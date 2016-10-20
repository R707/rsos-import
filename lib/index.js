/**
 * Created by cavasblack on 16/10/20.
 */
"use strict"
const fs = require("fs");
const path = require("path")
class Import {
    constructor(rootpath) {
        this.rootpath = rootpath;
        this.modules = {};
        this.init()

    }

    init() {
        var files = this.walkfile(this.rootpath)
        var self = this;
        files.forEach(function (item) {
            let regex = /.js$/;
            if(regex.exec(item)){
                self.import.bind(self)(item);
            }
        })
    }

    import(rootpath) {
        let regex = /index.js$/;
        if (regex.exec(rootpath)) {
            rootpath = rootpath.replace(/\/index.js$/, "");
        }
        let array = rootpath.replace(this.rootpath, "").split(path.sep)
        this.modules[array.join(".") || "."] = require(rootpath);
    }

    load(name) {
        return this.modules["." + name];
    }

    walkfile(rootpath) {
        let files = fs.readdirSync(rootpath);
        let result = [];
        let self = this;
        files.forEach(function (item, index) {
            let _tmppath = path.join(rootpath, item);
            let stat = fs.statSync(_tmppath);
            if (stat.isDirectory()) {
                result = result.concat(self.walkfile(_tmppath));
            } else {
                result.push(_tmppath);
            }
        });
        return result;
    }
}

module.exports = Import