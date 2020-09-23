import { map, catchError } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { HttpException } from '@nestjs/common';

export const pipeResponse = map((response: AxiosResponse) => response.data);

export const pipeError = catchError((e) => {
  throw new HttpException(e.response.data, e.response.status);
});
