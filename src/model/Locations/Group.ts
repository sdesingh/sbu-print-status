export default class Group {
  public static ParseFromJSON(json: any, meta: any): Group {
    const name = json.name;
    const desc = json.description;
    const group = new Group(name, desc);

    // Add Printers if they exist.
    if (json.hasOwnProperty("printerIDs")) {
      json.printerIDs.forEach((id: number) =>
        group.printers.push({
          id: id,
          name: meta[id].name
        })
      );
    }

    // Add Sub Groups if they exist.
    if (json.hasOwnProperty("subGroups")) {
      json.subGroups.forEach((j: any) => {
        const subGroup: Group = this.ParseFromJSON(j, meta);
        group.subGroups.push(subGroup);
      });
    }

    return group;
  }

  public name: string;
  public description: string;
  public subGroups: Group[];
  public printers: any[];

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
    this.printers = [];
    this.subGroups = [];
  }

  public get children(): any {
    if (this.hasChildren()) {
      const items: any[] = [];
      this.subGroups.forEach(group => {
        items.push({
          id: group.name,
          name: group.name,
          children: group.children
        });
      });
      return items;
    } else {
      return this.printers;
    }
  }

  public hasChildren(): boolean {
    return this.subGroups.length !== 0;
  }
}
