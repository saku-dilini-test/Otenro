import { PipeTransform, Pipe, Injectable } from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safeHtml' })

@Injectable()
export class SafeHtmlPipe implements PipeTransform {

  constructor(sanitized: DomSanitizer) { }

  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
