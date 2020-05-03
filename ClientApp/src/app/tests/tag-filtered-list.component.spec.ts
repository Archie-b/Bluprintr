/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />
import { FilteredList, ITaggable, ITaggable as ITaggable1 } from '../shared/TagFilteredList';
import { Blueprint } from '../shared/Blueprint';

describe('Filtered list', function () {
  let list: FilteredList<Blueprint>;
  const testBlueprint: Blueprint = new Blueprint();
  testBlueprint.Display = true;

  const testTags: string[] = ['testtag', 'testtag2'];
  it('Can be created',
    function () {
      list = new FilteredList<Blueprint>([], []);
      expect(list).toEqual(new FilteredList<Blueprint>([], []));
    });

  it('Can have tags added',
    function () {
      list = new FilteredList<Blueprint>([], testTags);
      expect(list.filters().length).toEqual(2);
      expect(list.filters()[0].tag).toEqual(testTags[0]);
      expect(list.filters()[1].tag).toEqual(testTags[1]);
    })

  it('Can have elements added', function () {
    list = new FilteredList<Blueprint>([testBlueprint], []);
    expect(list.items()[0]).toEqual(testBlueprint);
  })

  it('Can have elements and tags added', function () {
    list = new FilteredList<Blueprint>([testBlueprint], testTags);
    expect(list.items()[0]).toEqual(testBlueprint);
    expect(list.filters().length).toEqual(2);
    expect(list.filters()[0].tag).toEqual(testTags[0]);
    expect(list.filters()[1].tag).toEqual(testTags[1]);
  })

  it('Can have an include filter applied', function () {
    list = new FilteredList<Blueprint>(BlueprintListFactory());
    expect(list.items().length).toEqual(2);
    list.includeFilter('test1');
    expect(list.items().length).toEqual(1);
  })

  it('Can have an exclude filter applied', function () {
    list = new FilteredList<Blueprint>(BlueprintListFactory());
    expect(list.items().length).toEqual(2);
    list.excludeFilter('test3');
    expect(list.items().length).toEqual(1);
  })

  it('Can have it\'s filter cleared', function () {
    list = new FilteredList<Blueprint>(BlueprintListFactory());
    expect(list.items().length).toEqual(2);
    list.includeFilter('test1');
    expect(list.items().length).toEqual(1);
    list.clearFilter();
    expect(list.items().length).toEqual(2);
  })

  it('Can be filtered by search text', function() {
    list = new FilteredList<Blueprint>(BlueprintListFactory());
    expect(list.items().length).toEqual(2);
    list.searchText = "another";
    list.applySearchText();
    expect(list.items().length).toEqual(1);
  })
});

function BlueprintFactory(name:string,tags:string[]): Blueprint {
  let blueprint = new Blueprint();
  blueprint.Display = true;
  blueprint.Name = name;
  blueprint.Tags = tags;
  return blueprint;
}

function BlueprintListFactory(): Blueprint[] {
  return [BlueprintFactory('blueprint1', ['test1', 'test2']), BlueprintFactory('anotherBlueprint', ['test2', 'test3'])];
}
