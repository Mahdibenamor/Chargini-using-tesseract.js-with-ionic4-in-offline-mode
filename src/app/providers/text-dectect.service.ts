import { Injectable } from '@angular/core';


export class Line {
  public text: string;
}
@Injectable({
  providedIn: 'root'
})
export class TextDectectService {
  lines: Line[]=[];
  code:string="";
  data:string[][]=[];
  constructor() {
      this.data=[];
  }



  Extract_code(index:number){
      if(index===1){
          this.data=this.ooredoo;
          return this.Extract_code1(this.data);
      }
      if(index===2){
          this.data=this.orange;
          return this.Extract_code1(this.data);
      }
      if(index===3){
          this.data=this.TT;
          return this.Extract_code1(this.data);
      }

  }
  ExtractAndCleanlinesAndExtractCode(lines: any[]) :string{
         this.data=[];
         lines.forEach((obj: Line) =>{
             var str:string[]=[];
             str=obj.text.toString().toLowerCase().split('\n').join("").split(" ");
             this.data[this.data.length]=str;

          });
         this.code=this.Extract_code1(this.data);
         console.log(this.code);
         return this.code
  }

  Extract_code1(TabStr:string[][]) :string {
        console.log('dans extract code');
        let code: string = '';
        for (let line of  TabStr) {
            code = "";
            for (let word of line) {
                if (!Number.isNaN(Number(word))) {
                    if (word.length === 14) {
                        code = word;
                        return code;
                    } else {
                        code = code + word;
                        if (code.length === 14) {
                            return code;
                        }
                    }
                } else {
                    code = ""
                }
            }
        }
        return '';
    }

    TT:string[][]=[
        ["*", "."],
        [":", "s", "a"],
        ["r", "grattez", "ic", "liss", "wnat", "j"],
        [":", "pi"],
        ["8970", "826", "4262", "680"],
        ["c®)", "jupaill", "ddlhy", "joy", "@)", "123", "3)", "oalish", "|"],
        ["dbl", "diagho", "go", "juiill", "gl", "plasoy", "(plc", "c", "arse"],
        ["ad", ")", "700.", "juud", "o0giro", "dl", "dolhudl", "oi", "ral", "ai"],
        ["sailis", "su", "gauss", "dass", "b"],
        ["composez", "le", "(*)", "123", "(*)", "code", "de", "recharge", "@", "(,", "jd"],
        ["pour", "consulter", "votre", "solde", "ou", "vérifier", "la", "validi", "©", "de", "3"],
        ["votre", "compte,", "composez", "*122#", "a"],
        ["carte", "soumise", "a", "un", "droit", "de", "timbre", "de", "0,700dt", "g", "ur"],
        ["~~", "(haque", "valeur", "de", "50t", "."],
        ["|", "fe"],
        ["|", "ui", "=", "ec", "res", "se.", "tiongues", "dow", "salve", "|", "emviironnes", "er", "ki"],
        ["on", "lilt", "ad", "ha"],
        ["n°", "de", "série", "asdill", "aby", "-", "ry", "gc"],
    ];
    ooredoo:string[][]=
        [
            ["oo", "x"],
            ["tk-ooredoo-1dt", "an"],
            ["12/12/2019", "14:12:32"],
            ["6060", "196", "0300", "612"],
            ["recharger", "avant", "le;", "10/3/2020"],
            ["n°", "de", "série:", "801598756800"],
            ["rev:", "br1", "x"],
            ["le.", "a", "re"],
        ];
    ooredoo2:string[][]=[
        ["5", "tapez", "*101*", "code", "de", "recharge", "#)"],
        ["a", "3%", "jenoill", "jos", "*i01*", "ale", "bin]"],
        ["gratiez", "doucement,", "saisissez", "ou", "scannez", "le", "code", "de", "recharge", "ou", "le", "qr", "code"],
        ["j", "ati", "gprs", "8", "of", "wht", "ahir", "chit"],
        ["4539", "0377", "5452", "80"],
        ["bui", "ee"],
        ["|", "820982065325", "sa."],
        ["ae.", "ort", "de", "mtr", "de", "00", "a", "he", "st", "cu"]
    ];
    orange:string[][]=
        [
            ["5", "gratiez", "ici", "e", "geddag", "2"],
            [":", "7", "06475600097221"],
            ["e", "———"],
            [":", "d2)", "josey", "lita", "30,", "+", "hhh", "(+)"],
            [":", "tapez", "(+)", "i", "im", "(+)", "code", "de", "recharge", "(41d"],
            ["wows", "s5105s0834718s"],
            [";", "nema", "trio", "pe", "i"],
            ["i", "www.", "orange.", "tn"]
        ];

}

