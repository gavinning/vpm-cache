var os = require('os');
var fs = require('fs');
var path = require('path');
var Class = require('aimee-class');
var lib = require('linco.lab').lib;
var DB = Class.create();
var config = {};
// 默认数据存储路径
var tmpdir = path.join(os.tmpdir(), 'vpmcache');


// 初始化数据库位置
function cache(src) {
    config.path = src || tmpdir;
    lib.mkdir(config.path);
    return DB;
}
module.exports = cache;

// 获取指定数据库
DB.get = function(name){
    var db = new DB;
    var src = DB.getPath(name);

    db.path = src;
    db.name = name;

    try{
        db.data = JSON.parse(fs.readFileSync(db.path, 'utf-8'))
    }catch(e){
        db.data = {}
    }

    return db;
}

// 获取数据库文件地址
DB.getPath = function(name){
    return path.join(config.path, name + '.db');
}

// Document实例
DB.fn.extend({
    get: function(key){
        return key ? this.data[key] : this.data;
    },

    set: function(key, value){
        this.data[key] = value
    },

    del: function(key){
        delete this.data[key]
    },

    save: function(fn){
        try{
            fs.writeFileSync(this.path, JSON.stringify(this.data), 'utf-8');
            fn && fn(null, 'success')
        }catch(e){
            fn && fn(e)
        }
    }
})

