export default class Group {

  public static ParseFromJSON(json: any): Group {

    const name = json.name;
    const desc = json.description;
    const group = new Group(name, desc);

    // Add Printers if they exist.
    if ( json.hasOwnProperty('printerIDs') ) {

      json.printerIDs.forEach((id: number) => group.printerIDs.push(id));

    }

    // Add Sub Groups if they exist.
    if ( json.hasOwnProperty('subGroups') ) {

      json.subGroups.forEach(
        (j: any) => {
          const subGroup: Group = this.ParseFromJSON(j);
          group.subGroups.push(subGroup);
        }
      );

    }

    return group;

  }

  public name: string;
  public description: string;
  public subGroups: Group[];
  public printerIDs: number[];

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
    this.printerIDs = [];
    this.subGroups = [];
  }

  public get children(): any {
    if(this.hasChildren()) {
      const items: any[] = []
      this.subGroups.forEach(
        (group, i) => {
          items.push(
            {
              id: group.name,
              name: group.name,
              children: group.children 
            }
          )
        }
      )
      return items
    }
    else {
      const items: any[] = []
      this.printerIDs.forEach(
        (id, i) => {
          items.push(
            {
              id: id,
              name: id 
            }
          )
        }
      )
      return items;
    }
  }

  public hasChildren(): boolean {
    return this.subGroups.length !== 0;
  }
}
