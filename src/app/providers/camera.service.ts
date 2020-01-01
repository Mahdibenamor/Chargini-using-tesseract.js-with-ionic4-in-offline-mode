import { Injectable } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(private camera: Camera) { }


  getPicture(srcType: number) {

    return  this.camera.getPicture({
      quality: 100,
      sourceType: srcType,
      destinationType: this.camera.DestinationType.DATA_URL ,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit:true,
      targetWidth: 350,
      targetHeight: 250,
    })
  }

}
