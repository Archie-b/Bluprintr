export class FilteredList<T extends ITaggable> {

  private list: T[] = [];
  private filter: Filter[] = [];
  public searchText: string;

  public constructor(list: T[], tags?: string[]) {
    this.list = list;
    if (tags !== undefined) {
      this.filter = this.convertTagsToFilter(tags);
    } else {
      this.filter = this.convertTagsToFilter([].concat(...this.list.map((item: T) => item.Tags)).filter(
        function (value, index, self) {
          return self.indexOf(value) === index && value !== null;
        }));
    }
  }

  private getFilterItem(tag: Readonly<string>): Filter {
    return this.filter.filter((filterItem: Filter) => filterItem.tag === tag)[0];
  }

  private hasSearchText(): boolean {
    return this.searchText !== "";
  }

  private hasFilter(): boolean {
    return !this.filter.every((filterItem: Filter) => filterItem.active === EFilterState.Disabled ||
      filterItem.active === EFilterState.Exclude)
  }

  private itemPassesFilter(item: Readonly<ITaggable>, filter: Readonly<EFilterState>): boolean {
    return item.Tags.filter((tag: string) => !!tag).some((tag: string) => this.getFilterItem(tag).active === filter);
  }

  private convertTagsToFilter(tags: Readonly<string>[]): Filter[] {
    return tags.map(tag => new Filter({ tag }));
  }

  private updateFilterItem(filterItem: Filter, updatedState: EFilterState): void {
    if (filterItem.active === updatedState) {
      filterItem.active = EFilterState.Disabled;
    } else {
      filterItem.active = updatedState;
    }
  }

  private updateList(hasFilter: Readonly<boolean>): void {
    this.list.forEach((listItem: ITaggable) => listItem.Display = !hasFilter);
    if (hasFilter) this.list.filter((listItem: ITaggable) => !listItem.Tags).forEach((listItem: ITaggable) => listItem.Display === false);
    this.list.filter((listItem: ITaggable) => !!listItem.Tags).forEach((listItem: ITaggable) => {
      if (hasFilter && this.itemPassesFilter(listItem, EFilterState.Include)) listItem.Display = true;
      if (this.itemPassesFilter(listItem, EFilterState.Exclude)) listItem.Display = false;
      if (listItem.Display && this.hasSearchText() && listItem.Name.toLowerCase().indexOf(this.searchText.toLowerCase()) === -1) listItem.Display = false;
    });
  }

  applySearchText(): void {
    this.updateList(this.hasFilter());
  }

  clearFilter(): void {
    this.filter.forEach((filterItem: Filter) => filterItem.active = EFilterState.Disabled);
    this.updateList(this.hasFilter());
  }

  excludeFilter(tag: string): void {
    this.updateFilterItem(this.getFilterItem(tag), EFilterState.Exclude);
    this.updateList(this.hasFilter());
  }

  filters(): Filter[] {

    return this.filter;
  }

  includeFilter(tag: string): void {
    this.updateFilterItem(this.getFilterItem(tag), EFilterState.Include);
    this.updateList(this.hasFilter());
  }

  items(): T[] {
    return this.list.filter((listItem: ITaggable) => listItem.Display);
  }

}

export interface ITaggable {
  Tags: string[],
  Display: boolean,
  Name: string
}

enum EFilterState {
  Include = 0,
  Exclude = 1,
  Disabled = 2
}

class Filter {
  tag: string;
  active: EFilterState;

  constructor({ tag, active = EFilterState.Disabled }: { tag: string, active?: EFilterState }) {
    this.tag = tag;
    this.active = active;
  }
}
