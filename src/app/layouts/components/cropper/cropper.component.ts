import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import Cropper from 'cropperjs';

@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss']
})
export class CropperComponent implements AfterViewInit {
  @ViewChild('image', {static: false}) image: ElementRef;
  cropper: any = null;
  @Output() cropped: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngAfterViewInit() {
    console.log(this.image);
    setTimeout(() => {
      this.cropper = new Cropper(this.image.nativeElement, {
        aspectRatio: 1 / 1,
        viewMode: 1
      });
    }, 1000);

  }

  cropImg() {
    const croppedCanvas = this.cropper.getCroppedCanvas();
    const base64 = croppedCanvas.toDataURL('image/jpeg', 0.7);
    this.cropped.emit(base64);
    // .toBlob((blob) => {
    //   // const formData = new FormData();
    //   // formData.append('croppedImage', blob/*, 'example.png' */);
    // });
  }
}
