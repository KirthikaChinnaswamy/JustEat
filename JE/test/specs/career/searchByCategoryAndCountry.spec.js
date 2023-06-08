const homePage = require('../../pageobjects/home.page');
const searchResultsPage = require('../../pageobjects/searchResults.page');
const { data } = require('../../resources/testData');

describe('Verify Global Career Search', () => {
    it('Verify career search by category and country', async () => {
        let category = data.category.sales;
        let country = data.country.germany;

        await homePage.selectCategory(category);
        await searchResultsPage.scrollToTitle();

        let filterValue = await searchResultsPage.getAppliedFilterValue();
        expect(filterValue).toEqual(category);

        let expectedCount = await searchResultsPage.getFilterCount(category);
        let actualCount = await searchResultsPage.getSearchResultsCount()
        expect(actualCount).toEqual(expectedCount);  
        
        await searchResultsPage.selectCountry(country);
        expect(await searchResultsPage.verifyCategory()).toBe(true, 'Category is not “Sales” on all results');

        await browser.pause(data.delay.min); //Added wait as the page takes time to update the filter count
        expectedCount = await searchResultsPage.getFilterCount(country);
        actualCount = await searchResultsPage.getSearchResultsCount()
        expect(actualCount).toEqual(expectedCount);  
    })
})