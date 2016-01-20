import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {FormattedMessage, IntlProvider} from 'react-intl';

import FormattedMarkedMessage from '../main';


describe("Marked", () => {
    it("converts bars to a wrapper", () => {
        const messages = {id: 'a|b|c'};
        renderToStaticMarkup(
                <IntlProvider locale='en' messages={messages}>
                    <FormattedMarkedMessage id='id' />
                </IntlProvider>
        ).should.equal('<span>a<span class="marked">b</span>c</span>');
    });

    it("converts |br| to line breaks", () => {
        const messages = {id: 'a|br|c'};
        renderToStaticMarkup(
                <IntlProvider locale='en' messages={messages}>
                    <FormattedMarkedMessage id='id' />
                </IntlProvider>
        ).should.equal('<span>a<br/>c</span>');
    });

    it("can handle breaks adjacent to wrappers", () => {
        const messages = {id: '|a||br|'};
        renderToStaticMarkup(
                <IntlProvider locale='en' messages={messages}>
                    <FormattedMarkedMessage id='id' />
                </IntlProvider>
        ).should.equal('<span><span class="marked">a</span><br/></span>');
    });

    it("can handle breaks nested in wrappers", () => {
        const messages = {id: '|a|br||'};
        renderToStaticMarkup(
                <IntlProvider locale='en' messages={messages}>
                    <FormattedMarkedMessage id='id' />
                </IntlProvider>
        ).should.equal('<span><span class="marked">a<br/></span></span>');
    });

    it("warns if unpaired markers are used", () => {
        const messages = {id: 'a|br|br|'};
        sinon.stub(console, 'error');
        renderToStaticMarkup(
                <IntlProvider locale='en' messages={messages}>
                    <FormattedMarkedMessage id='id' />
                </IntlProvider>
        ).should.equal('<span>a<br/>br|</span>');
        console.error.should.have.been.calledWithMatch(/[Uu]npaired/);
        console.error.restore();
    });

    it("variable tokenization does not interfere with marking", () => {
        const messages = {id: '|{v}|'};
        renderToStaticMarkup(
                <IntlProvider locale='en' messages={messages}>
                    <FormattedMarkedMessage id='id' values={{v: 'a'}} />
                </IntlProvider>
        ).should.equal('<span><span class="marked">a</span></span>');
    });

    it("values can be other React elements", () => {
        const messages = {template: '|{v}|', value: 'a'};
        let value = <FormattedMessage id='value' key='v' tagName='b' />;
        renderToStaticMarkup(
                <IntlProvider locale='en' messages={messages}>
                    <FormattedMarkedMessage id='template' values={{v: value}} />
                </IntlProvider>
        ).should.equal('<span><span class="marked"><b>a</b></span></span>');
    });

    it("markers in values should not be processed", () => {
        const messages = {template: '{v}', value: '|a||br|'};
        let value = <FormattedMessage id='value' key='v' tagName='b' />;
        renderToStaticMarkup(
                <IntlProvider locale='en' messages={messages}>
                    <FormattedMarkedMessage id='template' values={{v: value}} />
                </IntlProvider>
        ).should.equal('<span><b>|a||br|</b></span>');
    });
});


describe("Extending", () => {
    it("a different wrapper can be used", () => {
        class Marked extends FormattedMarkedMessage {
            mark = elements => <em>{elements}</em>;
        }
        renderToStaticMarkup(
                <IntlProvider locale='en' messages={{id: '|a|'}}>
                    <Marked id='id' />
                </IntlProvider>
        ).should.equal('<span><em>a</em></span>');
    });

    it("a different marker string can be given", () => {
        class Marked extends FormattedMarkedMessage {
            marker = '*';
        }
        renderToStaticMarkup(
                <IntlProvider locale='en' messages={{id: '*a*'}}>
                    <Marked id='id' />
                </IntlProvider>
        ).should.equal('<span><span class="marked">a</span></span>');
    });

    it("a different break element can be used", () => {
        class Marked extends FormattedMarkedMessage {
            br = () => '\n';
        }
        renderToStaticMarkup(
                <IntlProvider locale='en' messages={{id: '|br|'}}>
                    <Marked id='id' />
                </IntlProvider>
        ).should.equal('<span>\n</span>');
    });

    it("other substitutions can be defined", () => {
        class Marked extends FormattedMarkedMessage {
            substitutions = /\|([ab]r)\|/g;
            ar = () => '...';
        }
        renderToStaticMarkup(
                <IntlProvider locale='en' messages={{id: 'a|ar|b|br|c'}}>
                    <Marked id='id' />
                </IntlProvider>
        ).should.equal('<span>a...b<br/>c</span>');
    });
});


describe("Integration", () => {
    it("a shortcut is exported if react-intl-ns is available", function() {
        try {
            const {markedShortcut} = require('react-intl-marked');
            const m = markedShortcut();
            renderToStaticMarkup(
                    <IntlProvider locale='en' messages={{id: 'm|br|m'}}>
                        {m`id`}
                    </IntlProvider>
            ).should.equal('<span>m<br/>m</span>');
        } catch (e) {
            this.skip("Requires react-intl-ns to be installed.");
        }
    });
});
