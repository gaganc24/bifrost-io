'use strict';
let Helper = codecept_helper;

// use any assertion library you like
const assert = require('assert')
const ElementNotFound = require('codeceptjs/lib/helper/errors/ElementNotFound');


function assertElementExists(res, locator, prefix, suffix) {
    if (!res) {
        throw new ElementNotFound(locator, prefix, suffix);
    }
}
  
class CustomHelper extends Helper {
  /**
   * Click the first visible element matching the locator and context
   */
  async clickVisible(locator, context = undefined) {
    const wdio = this.helpers['WebDriverIO']
    let browser = wdio.browser;

    const res = await wdio._locateClickable(locator)
    const elemIsDisplayed = await Promise.all(res.map(elem => browser.elementIdDisplayed(elem.ELEMENT)))

    let visibleClickableElement
    res.forEach((elem, i) => elemIsDisplayed[i].value === true ? visibleClickableElement = elem : false) 

    if (context) {
        assertElementExists(visibleClickableElement, locator, 'Clickable element', `was not found inside element ${new Locator(context).toString()}`);
    } else {
        assertElementExists(visibleClickableElement, locator, 'Clickable element');
    }
    return browser.elementIdClick(visibleClickableElement.ELEMENT)
  }
}

module.exports = CustomHelper;