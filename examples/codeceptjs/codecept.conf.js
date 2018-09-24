const OutputDir = './__out'

/**
 * process.env.TEST_DEVICE can contain a chrome device
 */
const mobileEmulation = process.env.TEST_DEVICE !== undefined ? ({
  "deviceName": process.env.TEST_DEVICE
}) : undefined

exports.config = {
    "name": "codeceptjs",
    "tests": "./features/**/*_test.js",
    "timeout": 10000,
    "output": OutputDir,
    "helpers": {
      "WebDriverIO": {
        "url": "http://localhost",
        "host": process.env.SELENIUM_HOST || 'localhost',
        "port": process.env.SELENIUM_PORT || 4444,
        "browser": process.env.TEST_BROWSER || 'chrome',
        "restart": true,
        "keepBrowserState": false,
        "keepCookies": false,
        "smartWait": 2000,
        "waitForTimeout": 10000,
        "desiredCapabilities": {
          "goog:chromeOptions": {
            args: [ "--disable-gpu", "--window-size=1200,1200" ],
            mobileEmulation
          }
        },
        "chrome": {
          "headless": false
        }
      },
      "BifrostHelper": {
        "require": "bifrost-io/codeceptjs/dashboard_helper.js"
      },
      "CustomCommandsHelper": {
        "require": "./custom-commands.js"
      }
    },
    "multiple": {
      "parallel": {
        "chunks": 2,
        "browsers": ["chrome"]
      }
    },
    "include": {
      "I": "./custom-steps.js",
      "loginPage": "./pages/login.page.js",
      "onHandyTariffsPage": "./pages/handy-tariffs.page.js",
    },
    mocha: {
      reporterOptions: {
        'codeceptjs-cli-reporter': {
          stdout: '-',
          options: {
            steps: true,
          },
        },
        'mocha-junit-reporter': {
          stdout: '-',
          options: {
            mochaFile: '${OutputDir}/result.xml',
          },
        },
      },
    },
    "bootstrap": false,
    "teardown": null,
    "hooks": []
}
