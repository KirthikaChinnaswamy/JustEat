const homePage = require('../../pageobjects/home.page');
const searchResultsPage = require('../../pageobjects/searchResults.page');
const { data } = require('../../resources/testData');

describe('Verify Global Career Search', () => {
    it('verify career search by keyword and country', async () => {
        let country = data.country.netherlands;

        await homePage.search(data.searchTerm);
        let countryList = await searchResultsPage.getUniqueLocations();
        await expect(countryList.length).toBeGreaterThan(1);

        await searchResultsPage.selectCountry(country);
        let filterValue = await searchResultsPage.getAppliedFilterValue();
        expect(filterValue).toEqual(country);

        await browser.pause(data.delay.min); //Added wait as the page takes time to update the filter count
        countryList = await searchResultsPage.getUniqueLocations();
        await expect(countryList.length).toBe(1);
        expect(countryList).toContain(country,'Search results location contains other countries too');
    })
})