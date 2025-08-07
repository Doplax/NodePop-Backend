import { prop, getModelForClass } from '@typegoose/typegoose';
import { IsString, IsNumber, Min, Max, IsOptional, IsEnum, IsNotEmpty, IsBoolean} from 'class-validator';

export class Product {
  @prop({ required: true, trim: true }) 
  @IsString() 
  @IsNotEmpty()                     
  public name!: string;              
  
  @prop({ required: true, min: 0, max: 99999 })
  @IsNumber()
  @Min(0)
  @Max(99999)
  public price!: number;             
  
  @prop({ default: true })
  @IsOptional()
  @IsBoolean()
  public isForSale?: boolean;        
  
  @prop({ _id: false })              
  @IsOptional()
  public photo?: {
    data: Buffer | null;             
    contentType: string;             
  };
  
  @prop({ type: () => String, enum: ["Laptop", "Tablet", "Smartphone", "Desktop"] })
  @IsOptional()
  @IsEnum(["Laptop", "Tablet", "Smartphone", "Desktop"], { each: true })
  public tags?: string[];            
}


export const ProductMongooseModel  = getModelForClass(Product, {
  schemaOptions: { versionKey: false } 
});

export default ProductMongooseModel;
