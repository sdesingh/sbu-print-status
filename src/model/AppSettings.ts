import Cookie from 'js-cookie';

export default class AppSettings {

    
    public printersToRetrive: number[] = [];
    public refreshRate: number = 1;
    public enableDarkMode: boolean = false;
    public version: string = '0.1.0';
    public firstTime: boolean = true;

    static loadFromCookies(): AppSettings {
        const json = Cookie.get('settings');
        if(!json) {
            // Create defaults.
            return new AppSettings();
        }
        else {
            const settings: AppSettings = JSON.parse(json!);
            return settings;
        }
    }

    saveSettings(): void {
        Cookie.set('settings', JSON.stringify(this));
    }

}