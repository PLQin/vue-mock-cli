module.exports = function () {
  var Mockjs = require("Mockjs");
  var Random = Mockjs.Random
  var _ = require("lodash");
  var db1 = require("./db.json");
  var db2 = {  
    category: require("./view/categoryArr.json"),
    analytics_login: require("./view/analytics_login.json"),
    analytics_dashboard: require("./view/analytics_dashboard.json")
  }
  var profession = require("./view/saveProfession.json");

  return {
    traderPicList: {
      "status": 1,
      "message": "ok!",
      "data": {
        "total": 136539,
        "limit": 12,
        "result": _.times(100, function (n) {
          return {
            "title": Random.csentence(3, 5),
            "picurl": Random.image('200x100'),
            "pic_id": Random.natural(50000, 90000),
            ...Mockjs.mock({"format|1": ["ps","ai","jpg"]})
          }
        })
      }
    },
    people: _.times(100, function (n) {
      return {
        id: n,
        name: Mockjs.mock('@name'),
        avatar: Random.image('200x100')
      }
    }),
    address: _.times(100, function (n) {
      return {
        id: Mockjs.mock('@guid'),
        city: Mockjs.mock('@city'),
        county: Mockjs.mock('@county')
      }
    }),
    ...db1,
    ...db2,
    profession
  }
}