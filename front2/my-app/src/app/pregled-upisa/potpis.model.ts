import { Komentar } from "../nova-molba/komentar.model";
import { Upis } from "../novi-upis/upis.model";

export interface Potpis{
    upis:Upis
    komentar:Komentar[]
    privateKey:string
}