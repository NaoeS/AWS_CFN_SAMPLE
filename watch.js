const chokidar = require('chokidar');
const cfnLint = require('cfn-lint')

console.log('started watching.');

chokidar.watch('cfn', {ignored: /[\/\\]\./, usePolling: true}).on('change', path => {
  console.log(path);

  let result = null;

  try {
    result = cfnLint.validateFile(path);
  } catch (e) {
    console.error(e);
  }

  if (!result || result.templateValid) {
    console.log('template is valid.');

    return;
  }

  for (let key in result.errors) {
    if (result.errors[key].length) { console.log(result.errors[key]); }
  }
});
