import { Injectable, Logger } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

import { APP_CONFIG } from '../../configs/app.config';

@Injectable()
export class OpenAiService {
  private logger = new Logger('OpenAi Service');
  private configuration = new Configuration({
    apiKey: APP_CONFIG.ENV.OPEN_AI.API_KEY,
  });
  private openai = new OpenAIApi(this.configuration);
  private model = APP_CONFIG.ENV.OPEN_AI.MODEL;
  private role = APP_CONFIG.ENV.OPEN_AI.ROLE;

  async AskByText(text: string) {
    const wrapper = 'Answer the last sentence of this conversation with a long content: ';
    const question = `${wrapper} ${text}`;
    const chatCompletion = await this.openai.createChatCompletion({
      model: this.model,
      messages: [{ role: this.role, content: question }],
    });

    return chatCompletion.data.choices[0].message.content;
  }
}
