import {Injectable, ViewChild} from '@angular/core';
import Tesseract from 'tesseract.js';
import {Subject} from 'rxjs';
import {TextDectectService} from './text-dectect.service';
import {Platform} from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class OcrService {
    progressStatusSubject = new Subject<string>();
    progressSubject = new Subject<number>();
    codeSubject = new Subject<string>();
    progressBarSubject = new Subject<number>();
    code: string="";
    progressStatus: string = '';
    progress: number = null;
    progressBar: number=0;
    constructor(private TextDectectService:TextDectectService,
                private platform: Platform) {

    }

    EmitProgressStatus(progressStatus) {
        this.progressStatusSubject.next(progressStatus);
    }

    EmitProgress(progress) {
           this.progressSubject.next(progress);
    }

    EmitCode(code:string) {
        this.codeSubject.next(code);
    }

    EmitprogressBar(progress) {
        this.progressBarSubject.next(progress);
    }


    DoOCR(imageData) {
        const worker = new Tesseract.TesseractWorker({
            workerPath: 'tesseract-200alpha13/worker.min.js',
            langPath: 'tesseract-200alpha13',
            corePath: 'tesseract-200alpha13/tesseract-core.wasm.js'
        });

      /*  worker.detect(imageData).progress(progressEvent => {
            this.EmitProgressStatus(progressEvent.status);
            this.EmitProgress( progressEvent.progress);

        }).then(result => {
            console.log(result);
        });
      */
        this.EmitprogressBar(0);

        worker
            .recognize(imageData, 'eng')
            .progress(progressEvent => {
                this.EmitProgressStatus(progressEvent.status);
                this.EmitProgress( progressEvent.progress);
                this.EmitprogressBar(progressEvent.progress * 100);

            })
            .catch(error => {
                this.EmitProgressStatus(error);
                this.EmitProgress( null);
            })
            .then((result) => {
                console.log(result.lines);
                this.code=this.TextDectectService.ExtractAndCleanlinesAndExtractCode(Array.from(result.lines));
                this.EmitCode(this.code);
                worker.terminate();
            })
            .finally(() => {
                this.EmitprogressBar(1000);
                this.progressStatus = null;
                this.progress = null;
                this.EmitProgressStatus(null);
                this.EmitProgress( null);

            });

    }
}

