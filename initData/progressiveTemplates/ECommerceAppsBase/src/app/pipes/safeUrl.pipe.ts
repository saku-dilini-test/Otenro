import { PipeTransform, Pipe, Injectable } from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safeUrl' })

@Injectable()
export class SafeUrlPipe implements PipeTransform {

    constructor(private sanitized: DomSanitizer) { }

    transform(value) {
        return this.sanitized.bypassSecurityTrustResourceUrl(value);
    }
}