 export class FilteredList<T extends ITaggable> {

  private list: T[] = [];
  private filter: Filter[] = [];

  public constructor(list: T[]) {
    this.list = list;
    this.populateFilter();
  }

  private populateFilter(): void {
    this.list.filter((listItem: ITaggable) => !!listItem.tags).forEach((listItem: T) => {
      listItem.tags.filter((tag: string) => !!tag).forEach((listItemTag: string) => {
        !this.filter.some((filterItem: Filter) => filterItem.tag === listItemTag) ? this.filter.push(new Filter({ tag: listItemTag })) : null;
      });
    });
  }

  private getFilterItem(tag: string): Filter {
    return this.filter.filter((filterItem: Filter) => filterItem.tag === tag)[0];
  }

  private itemPassesFilter(item: ITaggable, filter: EFilterState): boolean {
    return item.tags.filter((tag: string) => !!tag).some((tag: string) => this.getFilterItem(tag).active === filter);
  }

  private updateList(): void {
    var noFiltersEnabled = this.filter.every((filterItem: Filter) => filterItem.active === EFilterState.Disabled || filterItem.active === EFilterState.Exclude);
    this.list.forEach((listItem: ITaggable) => listItem.display = noFiltersEnabled);
    if (!noFiltersEnabled) this.list.filter((listItem: ITaggable) => !listItem.tags).forEach((listItem : ITaggable) => listItem.display === false);
    this.list.filter((listItem: ITaggable) => !!listItem.tags).forEach((listItem: ITaggable) => {
      if (!noFiltersEnabled && this.itemPassesFilter(listItem, EFilterState.Include)) listItem.display = true;
      if (this.itemPassesFilter(listItem, EFilterState.Exclude)) listItem.display = false;
    });
  }

  private updateFilterItem(filterItem: Filter, updatedState: EFilterState): void {
    if (filterItem.active === updatedState) {
      filterItem.active = EFilterState.Disabled;
    } else {
      filterItem.active = updatedState;
    }
  }

  clearFilter(): void {
    this.filter.forEach((filterItem: Filter) => filterItem.active = EFilterState.Disabled);
    this.updateList();
  }

  excludeFilter(tag: string): void {
    this.updateFilterItem(this.getFilterItem(tag), EFilterState.Exclude);
    this.updateList();
  }

  filters(): Filter[] {
    return this.filter;
  }

  includeFilter(tag: string): void {
    this.updateFilterItem(this.getFilterItem(tag), EFilterState.Include);
    this.updateList();
  }

  items(): T[] {
    return this.list.filter((listItem: ITaggable) => listItem.display);
  }
}

export interface ITaggable {
  tags: string[],
  display: boolean,
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
