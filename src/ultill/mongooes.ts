export default {
    mutipleMongooseToObject: function (mongoose: any[]) {
        return mongoose.map(mongoose => mongoose.toObject());
    },
    mongooseToObject: function (mongoose: any) {
        return mongoose ? mongoose.toObject() : mongoose;
    }

};

// const mutipleMongooseToObject = ( bien: any[] ) : Array<any> =>
// {
//     return bien.map(bien => bien.toObject());
// }
// export default {mutipleMongooseToObject}


