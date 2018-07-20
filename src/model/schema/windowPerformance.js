const mongoose = require('../db');

const windowPerformanceSchema = mongoose.Schema({
  dateline: String,
  data: [{
    base: {
      url: String,
      ip: String,
      ua: String,
      loadPage: {
        start: Number,
        end: Number
      },
      domReady: {
        start: Number,
        end: Number
      },
      redirect: {
        start: Number,
        end: Number
      },
      lookupDomain: {
        start: Number,
        end: Number
      },
      ttfb: {
        start: Number,
        end: Number
      },
      request: {
        start: Number,
        end: Number
      },
      loadEvent: {
        start: Number,
        end: Number
      },
      appcache: {
        start: Number,
        end: Number
      },
      unloadEvent: {
        start: Number,
        end: Number
      },
      connect: {
        start: Number,
        end: Number
      },
    },
    entries: Array,
    date: Number
  }]
});

let windowPerformance
try {
  windowPerformance = mongoose.model('windowPerformance')
} catch (e) {
  windowPerformance = mongoose.model('windowPerformance', windowPerformanceSchema)
}

module.exports = windowPerformance