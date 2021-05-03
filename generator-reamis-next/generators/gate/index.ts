const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  // @ts-ignore
  constructor(args, opts) {
    super(args, opts);
    this.argument("destination", { type: String, required: true });
  }
  initializing() {
    const { destination } = this.options;
    const destinationPath = `${destination}/index.ts`;
    if (!this.existsDestination(destinationPath)) {
      this.writeDestination(destinationPath, '');
      console.log('index.ts created');
    } else {
      console.log('index.ts already exists.');
    }
  }
};
