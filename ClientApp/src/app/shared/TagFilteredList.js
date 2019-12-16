"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FilteredList = /** @class */ (function () {
    function FilteredList(list) {
        this.list = [];
        this.filter = [];
        this.list = list;
        this.populateFilter();
    }
    FilteredList.prototype.populateFilter = function () {
        var _this = this;
        this.list.filter(function (listItem) { return !!listItem.tags; }).forEach(function (listItem) {
            listItem.tags.filter(function (tag) { return !!tag; }).forEach(function (listItemTag) {
                !_this.filter.some(function (filterItem) { return filterItem.tag === listItemTag; }) ? _this.filter.push(new Filter({ tag: listItemTag })) : null;
            });
        });
    };
    FilteredList.prototype.getFilterItem = function (tag) {
        return this.filter.filter(function (filterItem) { return filterItem.tag === tag; })[0];
    };
    FilteredList.prototype.itemPassesFilter = function (item, filter) {
        var _this = this;
        return item.tags.filter(function (tag) { return !!tag; }).some(function (tag) { return _this.getFilterItem(tag).active === filter; });
    };
    FilteredList.prototype.updateList = function () {
        var _this = this;
        var noFiltersEnabled = this.filter.every(function (filterItem) { return filterItem.active === EFilterState.Disabled || filterItem.active === EFilterState.Exclude; });
        this.list.forEach(function (listItem) { return listItem.display = noFiltersEnabled; });
        if (!noFiltersEnabled)
            this.list.filter(function (listItem) { return !listItem.tags; }).forEach(function (listItem) { return listItem.display === false; });
        this.list.filter(function (listItem) { return !!listItem.tags; }).forEach(function (listItem) {
            if (!noFiltersEnabled && _this.itemPassesFilter(listItem, EFilterState.Include))
                listItem.display = true;
            if (_this.itemPassesFilter(listItem, EFilterState.Exclude))
                listItem.display = false;
        });
    };
    FilteredList.prototype.updateFilterItem = function (filterItem, updatedState) {
        if (filterItem.active === updatedState) {
            filterItem.active = EFilterState.Disabled;
        }
        else {
            filterItem.active = updatedState;
        }
    };
    FilteredList.prototype.clearFilter = function () {
        this.filter.forEach(function (filterItem) { return filterItem.active = EFilterState.Disabled; });
        this.updateList();
    };
    FilteredList.prototype.excludeFilter = function (tag) {
        this.updateFilterItem(this.getFilterItem(tag), EFilterState.Exclude);
        this.updateList();
    };
    FilteredList.prototype.filters = function () {
        return this.filter;
    };
    FilteredList.prototype.includeFilter = function (tag) {
        this.updateFilterItem(this.getFilterItem(tag), EFilterState.Include);
        this.updateList();
    };
    FilteredList.prototype.items = function () {
        return this.list.filter(function (listItem) { return listItem.display; });
    };
    return FilteredList;
}());
exports.FilteredList = FilteredList;
var EFilterState;
(function (EFilterState) {
    EFilterState[EFilterState["Include"] = 0] = "Include";
    EFilterState[EFilterState["Exclude"] = 1] = "Exclude";
    EFilterState[EFilterState["Disabled"] = 2] = "Disabled";
})(EFilterState || (EFilterState = {}));
var Filter = /** @class */ (function () {
    function Filter(_a) {
        var tag = _a.tag, _b = _a.active, active = _b === void 0 ? EFilterState.Disabled : _b;
        this.tag = tag;
        this.active = active;
    }
    return Filter;
}());
//# sourceMappingURL=TagFilteredList.js.map