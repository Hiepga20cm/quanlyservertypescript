"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    mutipleMongooseToObject: function (mongoose) {
        return mongoose.map(mongoose => mongoose.toObject());
    },
    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    }
};
// const mutipleMongooseToObject = ( bien: any[] ) : Array<any> =>
// {
//     return bien.map(bien => bien.toObject());
// }
// export default {mutipleMongooseToObject}
//# sourceMappingURL=mongooes.js.map