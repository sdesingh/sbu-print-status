export class Tray {

  public static ParseFromJSON(json: any): Tray {
    const _name = 'name';
    const _setting = 'setting';
    const _status = 'paperStatusCode';

    const name = json[_name];

    let setting: TraySetting;

    switch (json[_setting]) {
      case 'Letter':
        setting = TraySetting.LETTER;
        break;
      case 'A4':
        setting = TraySetting.A4;
        break;
      case 'Executive':
        setting = TraySetting.EXECUTIVE;
        break;
      default:
        setting = TraySetting.UNKNOWN;
        break;
    }

    let status: TrayStatus;

    switch (json[_status]) {

      case 0:
        status = TrayStatus.FULL;
        break;
      case 1:
        status = TrayStatus.LOW;
        break;
      case 2:
        status = TrayStatus.EMPTY;
        break;
      case 3:
        status = TrayStatus.MISSING;
        break;
      default:
        status = TrayStatus.UNKNOWN;
    }

    return new Tray(name, setting, status);
  }

  public name: string;
  public setting: TraySetting;
  public status: TrayStatus;

  constructor(name: string, setting: TraySetting, status: TrayStatus) {
    this.name = name;
    this.setting = setting;
    this.status = status;
  }

}

export enum TraySetting {
    LETTER = 'Letter',
    A4 = 'A4',
    EXECUTIVE = 'Executive',
    UNKNOWN = 'Unknown',
}

export enum TrayStatus {
  FULL = 'Full',
  LOW = 'Low',
  EMPTY = 'Empty',
  MISSING = 'Missing',
  UNKNOWN = 'Unknown',
}
