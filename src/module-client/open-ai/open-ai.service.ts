import { Injectable, Logger } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

import { APP_CONFIG } from '../../configs/app.config';

@Injectable()
export class OpenAiService {
  private logger = new Logger('Open AI Service');
  private listKeys = APP_CONFIG.ENV.OPEN_AI.API_KEY.split(',');
  private indexKey = 0; // default 0
  private configuration = new Configuration({
    apiKey: this.listKeys[this.indexKey],
  });
  private openai = new OpenAIApi(this.configuration);
  private model = APP_CONFIG.ENV.OPEN_AI.MODEL;
  private role = APP_CONFIG.ENV.OPEN_AI.ROLE;

  async AskByText(text: string) {
    try {
      console.log('index key::', this.indexKey);
      console.log('configuration ::', this.configuration);
      const wrapper = 'Answer the last sentence of this conversation with a long content: ';
      const question = `${wrapper} ${text}`;
      const chatCompletion = await this.openai.createChatCompletion({
        model: this.model,
        messages: [{ role: this.role, content: question }],
      });

      return chatCompletion.data.choices[0].message.content;
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.error.type === 'invalid_request_error' && error.response.data.error.code === 'invalid_api_key') {
        console.log('vào đây');
        this.indexKey = 1;
        this.configuration = new Configuration({
          apiKey: this.listKeys[this.indexKey],
        });
        return this.AskByText(text);
      }
      throw error;
    }
  }
}
