# sigh-mocha

[![build status](https://circleci.com/gh/sighjs/sigh-karma.png)](https://circleci.com/gh/sighjs/sigh-karma)

Runs karma with the provided options each time the plugin receives a value. If the tests are already running then the process is killed and the tests are run in a new process. The plugin maintains a cache of at least two processes with the karma state set up ready to run a test to ensure minimal latency.

## Example

`npm install --save karma` then add this to your `sigh.js`:
```javascript
var karma, glob, babel, write

module.exports = function(pipelines) {
  pipelines['build:source'] = [
    glob({ basePath: 'src' }, '**/*.js'),
    babel(),
    write('build/assets'),
    karma()
  ]
}
```

You can pass an object containing karma options as the first parameter to `karma`.

## TODO
 * Write more tests
