const minite = (d) => {
  let time = new Date(d),
    timeObj = {
      year: time.getFullYear(),
      month: time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1,
      day: time.getDate() < 10 ? '0' + time.getDate() : time.getDate(),
      hour: time.getHours() < 10 ? '0' + time.getHours() : time.getHours(),
      minute: time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
    }
  return `${timeObj.year}-${timeObj.month}-${timeObj.day} ${timeObj.hour}:${timeObj.minute}`
}

module.exports = {
  minite
};