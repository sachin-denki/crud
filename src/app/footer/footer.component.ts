import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  name = "Mr";
  base64Image: any;
  constructor() { }

  ngOnInit(): void {
  }

  
  downloadImage() {
    let imageUrl = "../../assets/images/1666852814865.jpg";
    
    this.getBase64ImageFromURL(imageUrl).subscribe((base64data: string) => {
      console.log(base64data);
      this.base64Image = "data:image/jpg;base64," + base64data;
      // save image to disk
      var link = document.createElement("a");
      document.body.appendChild(link); // for Firefox
      link.setAttribute("href", this.base64Image);
      link.setAttribute("download", "mrHankey.jpg");
      link.click();
    });
  }

  getBase64ImageFromURL(url: string) {
    return Observable.create((observer: Observer<string>) => {
      const img: HTMLImageElement = new Image();
      img.crossOrigin = "Anonymous";
      img.src = url;
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = err => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  getBase64Image(img: HTMLImageElement) {
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx: CanvasRenderingContext2D | any = canvas.getContext("2d"); 
    ctx.drawImage(img, 0, 0);
    const dataURL: string = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }
}
