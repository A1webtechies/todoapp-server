import { IsNotEmpty, IsOptional } from 'class-validator';

export class TodoDto {
  @IsNotEmpty()
  title: string;
  @IsOptional()
  status: boolean;
}
