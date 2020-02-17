import { Anniversary, Anniversaries } from './anniversary';
import { Albums } from './album';

export class Lover {
    /**
     * 相爱纪念日
     */
    public loveDay: Anniversary;
    /**
     * 结婚纪念日
     */
    public weddingDay: Anniversary;
    public isBoyFirstLove: boolean;
    public isGirlFirstLove: boolean;
    public albums: Albums;
}
