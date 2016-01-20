import React, {createElement, isValidElement} from 'react';
import {FormattedMessage} from 'react-intl';


/**
 * Converts parts between | to spans with "marked" class and |br| to <br />.
 *
 * The class can be easily extended to define additional substitutions, or to
 * change markers or the wrapper generated.
 */
export default class FormattedMarkedMessage extends FormattedMessage {
    static displayName = 'FormattedMarkedMessage';

    // Text between markers is wrapped using mark().
    marker = '|';

    // This is called for markers. One element with a key should be returned.
    mark(elements, counter) {
        let key = `mark-${counter}`;
        return <span key={key} className='marked'>{elements}</span>;
    }

    // Matching parts get replaced by the result of calling a respective method.
    substitutions = /\|(br)\|/g;

    // This is called for |br|. A React element with a key should be returned.
    br(counter) {
        let key = `br-${counter}`;
        return <br key={key} />;
    }

    render() {
        // Half of what follows is a copy of intl's FormattedMessage.render().
        // The values provided (as a prop) to FormattedMessage may be strings,
        // and in general, after FormattedMessage.render() is executed, they
        // are hard to distinguish from the pieces of the message string.
        // We want to only process markers in the source message string, hence
        // the code replication is hardly avoidable.
        // On the other hand, the processing needed to handle formatting with
        // values can be reused for substitutions, limiting the overhead.
        const {formatMessage} = this.context.intl;
        const {values, tagName, children, ...descriptor} = this.props;

        // Creates a token with a random UID that should not be guessable or
        // conflict with other parts of the `message` string.
        let uid = Math.floor(Math.random() * 0x10000000000).toString(16);
        let tokenRegexp = new RegExp(`(@__ELEMENT-${uid}-\\d+__@)`, 'g');

        let generateToken = (() => {
            let counter = 0;
            return () => `@__ELEMENT-${uid}-${counter += 1}__@`;
        })();

        let tokenizedValues = {};
        let elements = {};

        // Iterates over the `props` to keep track of any React Element values
        // so they can be represented by the `token` as a placeholder when the
        // `message` is formatted. This allows the formatted message to then be
        // broken-up into parts with references to the React Elements inserted
        // back in.
        Object.keys(values).forEach(name => {
            let value = values[name];
            if (isValidElement(value)) {
                let token = generateToken();
                tokenizedValues[name] = token;
                elements[token] = value;
            } else {
                tokenizedValues[name] = value;
            }
        });

        let formattedMessage = formatMessage(descriptor, tokenizedValues);

        // Replace substitutions by tokens.
        let substCounter = 0;
        let message = formattedMessage.replace(this.substitutions, (_, m) => {
            let token = generateToken();
            elements[token] = this[m](substCounter += 1);
            return token;
        });

        // Converts a string with tokens to an array of elements with each
        // token replaced by an entry from the `elements` map.
        function substituteTokens(string) {
            let parts = string.split(tokenRegexp).filter(part => part);
            return parts.map(part => elements[part] || part);
        }

        // Split on marking bars.
        let nodes = [];
        let parts = message.split(this.marker);
        if (parts.length % 2 === 1) {
            let markCounter = 0;
            for (let i = 0; i < parts.length; i += 1) {
                // Replace all tokens with their substitutions.
                let subnodes = substituteTokens(parts[i]);
                // Wrap every other part (now an array of elements).
                if (i % 2 === 0) {
                    nodes.push(...subnodes);
                } else {
                    nodes.push(this.mark(subnodes, markCounter += 1));
                }
            }
        } else {
            if (process.env.NODE_ENV !== 'production') {
                console.error(`Unpaired markers in message: ${descriptor.id}`);
            }
            // We can still do the substitutions, even if marking fails.
            nodes = substituteTokens(message);
        }

        if (typeof children === 'function') {
            return children(...nodes);
        }

        return createElement(tagName, null, ...nodes);
    }
}


// Registers the marked message as a m() shortcut with react-intl-ns.
try {
    // Workaround: What is the ES7 way of handling optional imports?
    const reactIntlNs = require('react-intl-ns');
    const {maybeEvaluateTemplate, registerIntlShortcut} = reactIntlNs;
    registerIntlShortcut('m', prefix => (...args) => {
        let {id, values} = maybeEvaluateTemplate(args);
        return <FormattedMarkedMessage id={prefix(id)} defaultMessage={id}
                                       values={values} />;
    });
} catch (e) {
    // No react-intl-ns.
}
