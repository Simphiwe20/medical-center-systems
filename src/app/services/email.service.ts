import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  
  
  constructor() { }

  sendEmail(to: string, subject: string, message: string): Promise<EmailJSResponseStatus> {
    const emailParams = {
      to_email: to,
      subject: subject,
      message: message
    };

    return emailjs.send('service_qcyibif', 'template_ghl9rhc', emailParams, 'AC09qjYdVrapPhld6');
  }
}
