moment.updateLocale("zh-cn", {
  meridiem: function (hour, minute, isLowercase) {
    return hour < 6
      ? "凌晨"
      : hour < 9
      ? "早上"
      : hour < 11 && minute < 30
      ? "上午"
      : hour < 13 && minute < 30
      ? "中午"
      : hour < 18
      ? "下午"
      : "晚上";
  },
}),
  function () {
    var day, formats, hour, initialize, minute, second, week;
    (second = 1e3),
      (minute = 6e4),
      (hour = 36e5),
      (day = 864e5),
      (week = 6048e5),
      (year = new Date().getFullYear()),
      (formats = {
        seconds: { short: " 秒前", long: " 秒前" },
        minutes: { short: " 分前", long: " 分前" },
        hours: { short: " 小时前", long: " 小时前" },
        days: { short: " 天前", long: " 天前" },
      }),
      (initialize = function (moment) {
        var twitterFormat;
        return (
          (twitterFormat = function (format) {
            var diff, num, unit, unitStr;
            if (
              ((unit = null),
              (num = null),
              (diff = Math.abs(this.diff(moment()))) <= 1e3)
            )
              (unit = "seconds"), (num = 1);
            else if (diff < 6e4) unit = "seconds";
            else if (diff < 36e5) unit = "minutes";
            else if (diff < day) unit = "hours";
            else {
              if ("long" !== format) return this.format("YYYY年M月D日，HH:mm");
              if (!(diff < week))
                return this.year() == year
                  ? this.format("M月D日，HH:mm")
                  : this.format("YYYY年M月D日，HH:mm");
              unit = "days";
            }
            return (
              (num && unit) || (num = moment.duration(diff)[unit]()),
              (unitStr = unit = formats[unit][format]),
              "long" === format && num > 1 && (unitStr += ""),
              num + unitStr
            );
          }),
          (moment.fn.twitterLong = function () {
            return twitterFormat.call(this, "long");
          }),
          (moment.fn.twitter = moment.fn.twitterShort =
            function () {
              return twitterFormat.call(this, "short");
            }),
          moment
        );
      }),
      "function" == typeof define && define.amd
        ? define("moment-twitter", ["moment"], function (moment) {
            return (this.moment = initialize(moment));
          })
        : "undefined" != typeof module
        ? (module.exports = initialize(require("moment")))
        : "undefined" != typeof window &&
          window.moment &&
          (this.moment = initialize(this.moment));
  }.call(this);
