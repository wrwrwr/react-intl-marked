react-intl-marked
=================

When you need some message structure defined in the same place as the message.

Example
-------

```js
<FormattedMarkedMessage
        id='greeting'
        defaultMessage="Hello |{name}|!|br|How are you today?"
        values={{name: "Winston"}} />
```

would render as:

```html
<span>
    Hello <span class="marked">Winston</span>!
    <br/>
    How are you today?
</span>
```

The content between bars is wrapped in `<span class="marked">` and `|br|`
markers are replaced by `<br/>`. 

Values can be React elements just as with `<FormattedMessage>`, the resulting
tree takes advantage of React's virtual DOM.

Extending
---------

A different marker or wrapper?

```js
class Message extends FormattedMarkedMessage {
    marker = '*';

    mark(elements, counter) {
        let key = `star-${counter}`;
        return <span key={key} className='starred'>{elements}</span>;
    }
}
```

Some other substitutions?

```js
class Message extends FormattedMarkedMessage {
    substitutions = /\*(rand)\*/g;

    rand(counter) {
        let key = `rand-${counter}`;
        return <span key={key}>{Math.random()}</span>;
    }
}
```

Shortcut
--------

If you happen to have [react-intl-ns](https://github.com/wrwrwr/react-intl-ns)
installed you may use `m()` in place of `<FormattedMarkedMessage>`:

```js
m`Hello |Winston|!|br|How are you today?`
```

Installation and usage
----------------------

```bash
npm install react react-intl@2.0.0-beta-2 react-intl-ns react-intl-marked
```

### Bundler and transpiler

Import `main.jsx` from the module:

```js
import * from 'react-intl-marked/main.jsx';
```

and ensure it is passed through a transpiler. For instance, with Webpack and
Babel add a loader such as:

```js
test: /\.jsx$/,
include: 'react-intl-marked',
loader: 'babel',
query: {presets: ['es2015', 'stage-0', 'react']}
```

### Without a transpiler

Require `react`, `react-intl`, and `react-intl-marked`:

```js
var React = require('react');
var ReactIntl = require('react-intl');
var ReactIntlMarked = require('react-intl-marked');
```

You may also require a bundle for a specific standard edition by appending
`/dist/main.es5.js` (ES5 is the default, and the only option, unless you are
reading this in the future).

### Without a bundler

Add at least the following scripts to your page:

```html
<script src="node_modules/react/dist/react.js"></script>
<script src="node_modules/react-intl/dist/react-intl.js"></script>
<script src="node_modules/react-intl-marked/dist/main.es5.js"></script>
```

or take a look at a [minimal example](tests/browser.html).
