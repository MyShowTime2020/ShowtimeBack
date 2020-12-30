import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsString,
  IsNumber,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiModelProperty({
    example: 'Example Title',
    description: 'Title of article',
    format: 'string',
    minLength: 6,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  readonly title: string;

  @ApiModelProperty({
    example: 'description example ...',
    description: 'Main part of article',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiModelProperty({
    example: 'price example ...',
    description: 'Main part of article',
    format: 'number',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @ApiModelProperty({
    example: 'date_posted exmaple ...',
    description: 'Main part of article',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly date_posted: string;

  @ApiModelProperty({
    example: 'img exmaple ...',
    description: 'Main part of article',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly img: string;
}
