import { Document } from 'mongoose';

export interface oneProduct extends Document {
    id: string;
    title: string;
    description: string;
    price: number;
    date_posted: string;
    img: string;
};