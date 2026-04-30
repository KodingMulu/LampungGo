import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class adminWilayah {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  category!: string;

  @IsNumber()
  latitude!: number;

  @IsNumber()
  longitude!: number;

  @IsString()
  description!: string;

  priceEstimate!: number;
}
