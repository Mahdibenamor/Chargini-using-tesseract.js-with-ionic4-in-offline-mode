import {ChangeDetectorRef, Component,ViewChild} from '@angular/core';
import {NgProgressComponent} from '@ngx-progressbar/core';
import {CameraService} from '../providers/camera.service';
import {OcrService} from '../providers/ocr.service';
import {Subscription} from 'rxjs';
import {TextDectectService} from '../providers/text-dectect.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController,} from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';


@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.page.html',
  styleUrls: ['./recharge.page.scss'],
})
export class RechargePage {


    @ViewChild(NgProgressComponent, {static: false}) progressBar: NgProgressComponent;

    progressStatus: string = '';
    progress: number = null;
    imageData: string = '';
    CodeSubscription: Subscription;
    progressStatusSubscription: Subscription;
    progressSubscription: Subscription;
    progressBarSubscription: Subscription;
    code: string = '';
    prefixe: string = 'préfixe';

    constructor(private readonly changeDetectionRef: ChangeDetectorRef,
                private camera: CameraService,
                private ocr: OcrService,
                private TextDectectService: TextDectectService,
                private route: ActivatedRoute,
                private router: Router,
                private alertController: AlertController,
                private callNumber: CallNumber,
                public activatedRoute: ActivatedRoute,
    ) {

        this.activatedRoute.queryParams.subscribe((res) => {
            this.prefixe = res["id"];
        });


    }



    ionViewDidEnter() {
        this.Attache_variable_for_reception();
    }

    Attache_variable_for_reception() {
        this.progressSubscription = this.ocr.progressSubject.subscribe(
            (progress: number) => {
                this.progress = progress;
                this.changeDetectionRef.detectChanges();
            });

        this.progressStatusSubscription = this.ocr.progressStatusSubject.subscribe(
            (progressStatus: string) => {
                this.progressStatus = progressStatus;
                this.changeDetectionRef.detectChanges();
            });

        this.progressBarSubscription = this.ocr.progressBarSubject.subscribe(
            (progress: any) => {
                if (progress === 1000) {
                    this.progressBar.complete();
                }
                this.progressBar.set(progress);
                this.changeDetectionRef.detectChanges();
            });
        this.CodeSubscription = this.ocr.codeSubject.subscribe(
            (code: string) => {
                this.code = code;
                console.log(this.code);
                this.changeDetectionRef.detectChanges();
            });
    }



    CallNow() {
        if (this.code.length < 14) {
            alert("code invalide")
        } else {
            this.callNumber.callNumber('*' + this.prefixe + '*' + this.code + '#', true)
                .then(res => console.log('Launched dialer!', res))
                .catch(err => console.log('Error launching dialer', err));
        }
    }
    clickFileSelector() {
        this.camera.getPicture(0)
            .then(imageData => {
                this.imageData = 'data:image/jpeg;base64,' + imageData;
                this.ocr.DoOCR('data:image/jpeg;base64,' + imageData);
                this.changeDetectionRef.detectChanges();
            })
            .catch(err => {
                alert(err);
            });

    }
    TakePicture() {
        this.camera.getPicture(1)
            .then(imageData => {
                this.imageData = 'data:image/jpeg;base64,' + imageData;
                this.ocr.DoOCR('data:image/jpeg;base64,' + imageData);
                this.changeDetectionRef.detectChanges();
            })
            .catch(err => {
                alert(err);
            });
    }

    async ChangePayloadManual() {
        const inputAlert = await this.alertController.create({
            header: 'Veuillez changer ou entrer le code de recharge',
            subHeader: "Votre code",
            inputs: [{name: 'newCode', type: 'number', placeholder: 'veuillez écrivez ici', value: this.code}],
            buttons: [{text: 'Cancel'},
                {
                    text: 'Ok',
                    handler: data => {
                        if (data.newCode.length === 14) {
                            this.code = data.newCode
                        } else {
                            alert("code invalid")
                        }
                    }
                }]
        });

        await inputAlert.present();

    };
    getMesage(): string {
        if (this.code) {
            return '*' + this.prefixe + '*' + this.code + '#';
        }
        return '*' + this.prefixe + '*' + '--------------#';
    }


    ionViewWillLeave() {
        this.progressStatusSubscription.unsubscribe();
        this.progressSubscription.unsubscribe();
        this.progressBarSubscription.unsubscribe();
    }

}
