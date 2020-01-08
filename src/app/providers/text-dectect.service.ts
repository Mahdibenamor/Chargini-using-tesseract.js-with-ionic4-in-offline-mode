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

 
}

