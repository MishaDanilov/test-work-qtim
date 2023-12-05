import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      const messages = errors.map((error)=>{
        return `${error.property} - ${Object.values(error.constraints).join('; ')}`
      })
      throw new HttpException(messages, HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
