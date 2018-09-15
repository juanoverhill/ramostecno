import { Injectable } from '@angular/core';
import domtoimage from 'dom-to-image';


@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor() { }

  print(componentName) {
    var node = document.getElementById(componentName);

    domtoimage.toPng(node)
    .then(function (dataUrl) {
        var popup=window.open();
          const img = new Image();
          const img2 = new Image();
          img.src = dataUrl;
          img2.src = dataUrl;
          popup.document.body.appendChild(img);
          popup.document.body.appendChild(img2);
          // popup.document.close();
          popup.focus();
          var delayInMilliseconds = 500; //1 second

          setTimeout(function() {
            popup.print();
            popup.close();
          }, delayInMilliseconds);
          
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
  }
}
