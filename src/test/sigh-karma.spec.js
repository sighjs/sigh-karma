import _ from 'lodash'
import Promise from 'bluebird'
import { Bacon } from 'sigh-core'
import ProcessPool from 'process-pool'

import karma from '../index'

require('source-map-support').install()
require('chai').should()

describe('sigh-karma', () => {
  var procPool
  beforeEach(() => { procPool = new ProcessPool })
  afterEach(() => { procPool.destroy() })

  it('should run jasmine tests on a single event then pass value down stream', function() {
    this.timeout(9000)

    var stream = Bacon.constant([])
    return karma({ stream, procPool }).toPromise(Promise).then(events => {
      events.should.eql([])

      // TODO: the tests last 5 seconds, test this length of time has passed
    })
  })

  xit('should pass error down stream on jasmine test failure', () => {
  })

  xit('kill running jasmine test and start another on subsequent event', () => {
  })
})
