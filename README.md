![Xpub Scan Intepreter](./logo.png)

Xpub Scan reports interpeter.

This tool suggests interpretations of Xpub Scan reports in human language.

## Overview

![Flow](./flow.png)

## Install

```
$ yarn
$ yarn build
```

## Use

```
$ node lib/main.js {path to Xpub Scan JSON report}
```

Example:

```
$ node lib/main.js ./abcd.json
```

## Example

```
$ node lib/main.js ./abcd.json
...
Suggested interpretation

Out of sync since 2021-05-02 21:59:46.
In addition, 451 nonspecific operations are missing.
Besides, there are 31 operations which are extra operations but not duplication of existing operations.
```
