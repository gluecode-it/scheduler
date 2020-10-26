[![NPM Version](https://img.shields.io/npm/v/@gluecode-it/scheduler.svg?style=flat-square)](https://www.npmjs.com/package/@gluecode-it/scheduler)

A framework for triggering events of all kinds

## Contents

- [Installation](#installation)
- [Quick Start](#quick-start)

## Installation

```bash
$ npm install @gluecode-it/scheduler
```

## Quick Start

```js
const Compute = require("@google-cloud/compute");
import { GoogleVM, VmHandler } from "@gluecode-it/google-cloud-vm-handler";

const compute = new Compute();
const zone = compute.zone("europe-west-1");
const vm = zone.vm("instance-1") as GoogleVM;
const vmHandler = new VmHandler(vm);

await vmHandler.start();
vmHandler.onStarted(() => {
  await vmHandler.stop();
});

```