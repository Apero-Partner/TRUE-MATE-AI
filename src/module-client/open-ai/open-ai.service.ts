import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

import { APP_CONFIG } from '../../configs/app.config';

@Injectable()
export class OpenAiService {
  private logger = new Logger('Open AI Service');
  private listKeys = APP_CONFIG.ENV.OPEN_AI.API_KEY.split(',');
  private model = APP_CONFIG.ENV.OPEN_AI.MODEL;
  private role = APP_CONFIG.ENV.OPEN_AI.ROLE;

  // init default key
  private indexKey = 0;
  private configuration = new Configuration({
    apiKey: this.listKeys[this.indexKey],
  });
  private openai = new OpenAIApi(this.configuration);
  private timesOfLoop = 0;

  async AskByText(text: string) {
    const wrapper = 'Answer the last sentence of this conversation with a long content: ';
    const question = `${wrapper} ${text}`;
    try {
      const chatCompletion = await this.openai.createChatCompletion({
        model: this.model,
        messages: [{ role: this.role, content: question }],
      });

      //reset times of loop if success
      this.timesOfLoop = 0;

      return chatCompletion.data.choices[0].message.content;
    } catch (error) {
      console.log(error.response.data);

      //bắt case key bị die
      if (error.response.data.error.type === 'invalid_request_error' && error.response.data.error.code === 'invalid_api_key') {
        return this.resetKey(text);
      }
      throw error;
    }
  }
  private async resetKey(text: string) {
    if (this.indexKey === this.listKeys.length - 1) {
      //comeback the first key
      this.indexKey = 0;

      //increase time of loop when start again
      this.timesOfLoop += 1;
    } else {
      // next key
      this.indexKey += 1;
    }

    // loop 2 lần thì dừng
    if (this.timesOfLoop === 2) {
      console.log('các key hết hạn sau 2 lần loop');
      throw new InternalServerErrorException();
    }

    // set config with the new key
    this.configuration = new Configuration({
      apiKey: this.listKeys[this.indexKey],
    });
    this.openai = new OpenAIApi(this.configuration);

    return await this.AskByText(text);
  }
}
