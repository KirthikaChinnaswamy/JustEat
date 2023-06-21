exports.config = {
    runner: 'local',
    specs: [
        './test/specs/career/*.spec.js'
    ],
   
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 10,
    capabilities: [{
        browserName: 'chrome' 
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: ' https://careers.justeattakeaway.com/global/en/home',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['chromedriver'],
    framework: 'mocha',
    specFileRetries: 1,
    specFileRetriesDelay: 0,
    // specFileRetriesDeferred: false,
   
    reporters: [
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
   
    // =====
    // Hooks
    // =====
    before: async function(capabilities, specs) {
        await browser.maximizeWindow();
    },

    beforeSuite: function (suite) {
        global.allure = allure;
        allure.addFeature(suite.name);
        allure.addDescription('Generating Allure Reports: '+ suite.name);
    },

    beforeTest: async function (test, context) {
        await browser.url(this.baseUrl);
        allure.addDescription('Generating Allure Reports: '+ test.title);
    },
   
    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        if(!passed) {
            await browser.takeScreenshot();
        }
    }
}
