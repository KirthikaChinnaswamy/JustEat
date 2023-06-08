class HomePage {

    get txtbx_keywordSearch() {
        return $('#keywordSearch');
    }

    get btn_search() {
        return $('#ph-search-backdrop');
    }

    lbl_category(category) {
        return $('.au-target.phs-'+category);
    }

    async search(data) {
        await this.txtbx_keywordSearch.setValue(data);
        await this.btn_search.click();
    }

    async selectCategory(category) {
        await this.txtbx_keywordSearch.click()
        await this.lbl_category(category).click();
    }
}

module.exports = new HomePage();
