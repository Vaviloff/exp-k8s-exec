const k8s = require('@kubernetes/client-node');
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const exeClient = new k8s.Exec(kc);

const stream = require('stream');
const echoStream = new stream.Writable();
let result = '';
echoStream._write = function (chunk, encoding, done) {
  result += chunk.toString();
  done();
};

const namespace = 'default';
const podName = 'busybox';
const containerName = 'busybox';
const command = ['cat', '/example/data.json'];

(async () => {
  await exeClient.exec(
    namespace,
    podName,
    containerName,
    command,
    echoStream, // process.stdout
    process.stderr,
    process.stdin,
    true /* tty */,
    (status) => {
      console.log(`Exited with status: ${status.status}`);
      const payload = JSON.parse(result);
      console.log(`Retrieved instance ID from pod: ${payload.id}`);
      process.exit();
    }
  );
})();
