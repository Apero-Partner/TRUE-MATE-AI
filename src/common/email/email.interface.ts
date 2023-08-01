export interface IOptionSendEmail {
  language?: string;
  templateKey: string;
  subject?: string;
  mailFrom?: string;
  mailTo?: string[] | string;
  bcc?: string[];
  cc?: string[];
  contentMail: any;
}
export interface IOptionTriggerEvent {
  language?: string;
  templateKey: string;
  emailAddress?: string;
  mobileNumber?: string;
  content: any;
}

export interface SenderInfo {
  id?: string;
  username?: string;
  system?: string;
}
export interface ReceiveInfo {
  id?: string;
  username?: string;
}
