class searchResultsPage{
    
    get lbl_countryList() {
        return $$('.job-location');
    }

    get lbl_country() {
        return $('[aria-label="Country"]');
    }

    chkbx_country(country) {
        return $('//span[contains(@class, "text") and text() = "'+country+'"]');
    }

    get lbl_title() {
        return $('//ppc-content[text()="Refine your search"]');
    }

    get txt_appliedFilter() {
        return $('.facet-tag');
    }

    get txt_resultsCount() {
        return $('.result-count');
    }

    lbl_filterCount(filterName) {
        return $('//span[contains(@class, "text") and text() = "'+filterName+'"] //../span/span')
    }

    get lbl_categoryList() {
        return $$(".au-target.category")
    }

    async getUniqueLocations() {
        const countrySet = new Set();
        let country;

        await this.lbl_countryList.forEach(async (element) => {
            country = (await element.getText()).split(", ");
            countrySet.add(country[country.length-1]);
          });
        return [...new Set(countrySet)];
    }

    async selectCountry(country) {
        await this.lbl_country.click()
        await this.chkbx_country(country).click();
    }

    async scrollToTitle() {
        console.log(await this.lbl_title.getText())
        await this.lbl_title.scrollIntoView();
    }

    async getAppliedFilterValue() {
        (await this.txt_appliedFilter).waitForDisplayed();
        return await this.txt_appliedFilter.getText();
    }

    async getSearchResultsCount() {
        return await this.txt_resultsCount.getText()    
    }

    async getFilterCount(filter) {
        let filterCount = (await this.lbl_filterCount(filter).getText()).split(" ");
        return filterCount[1];
    }

    async verifyCategory(category) {
        await this.lbl_categoryList.forEach(async (element) => {
            if((await element.getText()).includes(category))
                return false;
        });
        return true
    }
}

module.exports = new searchResultsPage();
