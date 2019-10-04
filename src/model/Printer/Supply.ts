export class Supply {

  public static FromJSON(json: any): Supply {
    const _name = 'name';
    const _currCap = 'currentCapacity';
    const _maxCap = 'maxCapacity';
    const _perRemain = 'percentRemaining';
    const _warningThreshold = 'warningThreshold';

    try {

      const name = json[_name];
      const currentCapacity = json[_currCap];
      const maxCapacity = json[_maxCap];
      const percent = json[_perRemain];
      const threshold = json[_warningThreshold];

      let type: SupplyType;
      switch (name) {
        case 'Toner':
          type = SupplyType.TONER;
          break;
        case 'Maintenance Kit':
          type = SupplyType.MAINTENANCE_KIT;
          break;
        case 'Drum Kit':
          type = SupplyType.DRUM_KIT;
          break;
        default: type = SupplyType.UNKNOWN;

      }


      return new Supply(type, percent, threshold, currentCapacity, maxCapacity);

    } catch (e) {
      console.log('Unable to parse supply.');
    }


    return new Supply(SupplyType.UNKNOWN, -1, -1, -1, -1);

  }

  public percentRemaining: number;
  public currentCapacity: number;
  public maxCapacity: number;
  public warningThreshold: number;
  public supplyType: SupplyType;

  constructor(type: SupplyType, percent: number, threshold: number, currCap: number, maxCap: number) {
    this.percentRemaining = percent;
    this.currentCapacity = currCap;
    this.maxCapacity = maxCap;
    this.warningThreshold = threshold;
    this.supplyType = type;
  }

  public isBelowThreshold(): boolean {
    return this.percentRemaining < this.warningThreshold;
  }

  public needsReplacement(): boolean {
    return this.percentRemaining <= 1;
  }


}

enum SupplyType {
  TONER = 'TONER',
  MAINTENANCE_KIT = 'MAINTENANCE_KIT',
  DRUM_KIT = 'DRUM_KIT',
  UNKNOWN = 'UNKNOWN',
}
