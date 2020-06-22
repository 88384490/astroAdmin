const AV = require("leancloud-storage");
const UserId = "PnjMGplzPRjWutkXjJBHmbvh-gzGzoHsz";
const UserKey = "TTM7fbngWPg0mBhQAGzuOzMw";
const { Query } = AV;
AV.init({
  appId: UserId,
  appKey: UserKey,
  serverURL: "https://pnjmgplz.lc-cn-n1-shared.com",
});

let Server: any = function () {};

Server.prototype = {
  user: AV.User,
  initQuery: function (name: string) {
    let table = new Query(name);
    return table;
  },
  query: function (name: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let AvObj = this.initQuery(name);
      AvObj.find()
        .then(function (item: any) {
          resolve(item);
        })
        .catch(function (error: any) {
          reject(error);
        });
    });
  },
  queryById: function (name: string, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let AvObj = this.initQuery(name);
      AvObj.get(id)
        .then(function (item: any) {
          resolve(item);
        })
        .catch(function (error: any) {
          reject(error);
        });
    });
  },
  add: function (name: string, obj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let tableObj = AV.Object.extend(name);
      let currentUser = AV.User.current();
      let item = new tableObj();
      for (let objItem in obj) {
        item.set(objItem, obj[objItem]);
      }
      item.save().then(
        () => {
          resolve(true);
        },
        (error: any) => {
          reject(error);
        }
      );
    });
  },
  update: function (name: string, id: string, formData: any) {
    return new Promise((resolve, reject) => {
      let responseObj = AV.Object.createWithoutData(name, id);
      for (const item in formData) {
        responseObj.set(item, formData[item]);
      }
      responseObj
        .save()
        .then(() => {
          resolve(true);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  },
  delete: function (name: string, id: string) {
    return new Promise((resolve, reject) => {
      let responseObj = AV.Object.createWithoutData(name, id);
      responseObj
        .destroy()
        .then((resp: any) => {
          resolve(true);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  },
};

export default Server;
