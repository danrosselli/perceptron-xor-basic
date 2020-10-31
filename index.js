import Synaptic from 'synaptic';
import clui from  'clui';
import cursor from  'move-terminal-cursor';
import figlet from  'figlet';

// terminal UI tools
var Gauge = clui.Gauge;
console.clear();
console.log(figlet.textSync('Neural Network', {
    font: 'Standard',
    horizontalLayout: 'fitted',
    verticalLayout: 'fitted',
    width: 80,
    whitespaceBreak: true
}));

// mount neural network to solve XOR

var Neuron = Synaptic.Neuron,
    Layer = Synaptic.Layer,
    Network = Synaptic.Network,
    Trainer = Synaptic.Trainer,
    Architect = Synaptic.Architect;

/*
// detailed mode
let inputLayer = new Layer(2);
let hiddenLayer = new Layer(3);
let outputLayer = new Layer(1);

inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

let network = new Network({
  input: inputLayer,
  hidden: [hiddenLayer1],
  output: outputLayer
});
*/

// fast mode
let network = new Architect.Perceptron(2, 3, 1);

let learningRate = .3;

console.log('\n');
console.log('XOR output before learning: ');
console.log("[0,0]", network.activate([0,0]));
console.log("[0,1]", network.activate([0,1]));
console.log("[1,0]", network.activate([1,0]));
console.log("[1,1]", network.activate([1,1]));

cursor("down", {count: 13});

let trainig_step = 5000;
let goal = 0;
let interval = setInterval(() => {

  let out1, out2, out3, out4;

  out1 = network.activate([0,0]);
  network.propagate(learningRate, [0]);

  out2 = network.activate([0,1]);
  network.propagate(learningRate, [1]);

  out3 = network.activate([1,0]);
  network.propagate(learningRate, [1]);

  out4 = network.activate([1,1]);
  network.propagate(learningRate, [0]);

  cursor("up", {count: 13});
  console.log('\n');
  console.log('XOR output while learning: ', trainig_step, '    ');
  console.log("[0,0]", out1);
  console.log("[0,1]", out2);
  console.log("[1,0]", out3);
  console.log("[1,1]", out4);
  console.log('\n');
  console.log(Gauge(out1, 1, 50, .5, 'XOR input [0,0] | Output: ' + parseFloat(out1).toFixed(2)));
  console.log(Gauge(out2, 1, 50, .5, 'XOR input [0,1] | Output: ' + parseFloat(out2).toFixed(2)));
  console.log(Gauge(out3, 1, 50, .5, 'XOR input [1,0] | Output: ' + parseFloat(out3).toFixed(2)));
  console.log(Gauge(out4, 1, 50, .5, 'XOR input [1,1] | Output: ' + parseFloat(out4).toFixed(2)));

  if (parseFloat(out1).toFixed(2) === '0.00' &&
    parseFloat(out2).toFixed(2) === '1.00' &&
    parseFloat(out3).toFixed(2) === '1.00' &&
    parseFloat(out4).toFixed(2) === '0.00') {
    goal++;
  }

  // after finish the training set
  if (!trainig_step) {

    clearInterval(interval);
    console.log('\n');
    console.log('XOR output after learning: ');
    console.log(network.activate([0,0]));
    console.log(network.activate([0,1]));
    console.log(network.activate([1,0]));
    console.log(network.activate([1,1]));
    console.log('\n');
    console.log('Objective achieved with ', goal, ' steps to the end');
    console.log('\n');

  }

  trainig_step--;

}, 5);
