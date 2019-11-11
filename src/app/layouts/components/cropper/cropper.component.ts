import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import Cropper from 'cropperjs';

@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss']
})
export class CropperComponent{
  @ViewChild('image', {static: false}) image: ElementRef;
  cropper: any = null;
  @Output() cropped: EventEmitter<any> = new EventEmitter();
  currentImg: any = null;

  constructor() {
  }


  onFileChange(img) {
    var reader = new FileReader();
    reader.onload = ((e:any) => {
      this.currentImg = e.target.result;
      setTimeout(()=>{
        this.cropper = new Cropper(this.image.nativeElement, {
          aspectRatio: 1 / 1,
          viewMode: 1
        });
      },100)
    })
    reader.readAsDataURL(img.target.files[0]);
  }

  cropImg() {
    const croppedCanvas = this.cropper.getCroppedCanvas();
    const base64 = croppedCanvas.toDataURL('image/jpeg', 0.7);
    croppedCanvas.toBlob((blob) => {
      this.cropped.emit({base64, blob});
    });
  }
}
