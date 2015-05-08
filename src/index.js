import { Bacon } from 'sigh-core'

export default function(op, opts = {}) {
  var karmaProc = op.procPool.prepare(opts => {
    var server = require('karma').server
    var Promise = require('bluebird')
    var _ = require('lodash')
    var path = require('path')
    var log = require('sigh-core').log

    _.assign(opts, { action: 'run', singleRun: true, autoWatch: true })
    _.defaults(opts, { configFile: path.resolve('karma.conf.js') })

    return () => {
      log('karma: run tests in process %s', process.pid)
      return new Promise(resolve => {
        server.start(opts, exitCode => {
          log('karma exit code: %s', exitCode)
          resolve(exitCode)
        })
      })
    }
  }, opts, { processLimit: 2 })

  return op.stream.flatMapLatest(events => {
    // TODO: log message if process was killed
    karmaProc.kill()

    return Bacon.fromPromise(karmaProc().then(exitCode => {
      return exitCode > 0 ? new Bacon.Error(`karma: tests failed (${exitCode})`) : events
    }))
  })
}
