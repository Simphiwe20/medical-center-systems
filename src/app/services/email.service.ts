import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  
  constructor() {
    emailjs.init('_Zqr577bBGjXaK5fQ');
  }
  sendEmail(templateId: string, emailParams: any): Promise<EmailJSResponseStatus> {
    return emailjs.send('service_qcyibif', templateId, emailParams);
  }
}
